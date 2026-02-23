<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function env_string(string $key): string
{
    $value = getenv($key);
    if (!is_string($value) || trim($value) === '') {
        $value = $_SERVER[$key] ?? ($_ENV[$key] ?? '');
    }
    if (!is_string($value)) {
        return '';
    }
    return trim($value);
}

function str_field(string $key, int $maxLen = 10000): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }

    $value = trim($value);
    if ($maxLen > 0 && strlen($value) > $maxLen) {
        $value = substr($value, 0, $maxLen);
    }
    return $value;
}

function bool_field(string $key): bool
{
    if (!isset($_POST[$key])) {
        return false;
    }
    $value = $_POST[$key];
    if (is_string($value)) {
        $normalized = strtolower(trim($value));
        return in_array($normalized, ['1', 'true', 'on', 'yes'], true);
    }
    return (bool) $value;
}

function ensure_storage_dir(string $path): void
{
    if (is_dir($path)) {
        return;
    }
    if (!@mkdir($path, 0775, true) && !is_dir($path)) {
        throw new RuntimeException('Nie udało się utworzyć katalogu storage.');
    }
}

function append_csv_row(string $csvPath, array $row): void
{
    $fp = @fopen($csvPath, 'ab');
    if ($fp === false) {
        throw new RuntimeException('Nie udało się otworzyć pliku z zapisami formularza.');
    }

    try {
        if (!flock($fp, LOCK_EX)) {
            throw new RuntimeException('Nie udało się zablokować pliku formularza.');
        }

        $stat = fstat($fp);
        $isEmpty = !is_array($stat) || (($stat['size'] ?? 0) === 0);

        if ($isEmpty) {
            fputcsv($fp, [
                'created_at',
                'name',
                'email',
                'role',
                'needs',
                'consent',
                'source',
                'submitted_at_iso',
                'remote_ip',
                'user_agent',
                'referer',
            ]);
        }

        if (fputcsv($fp, $row) === false) {
            throw new RuntimeException('Nie udało się zapisać zgłoszenia do pliku CSV.');
        }

        fflush($fp);
        flock($fp, LOCK_UN);
    } finally {
        fclose($fp);
    }
}

function maybe_send_email(array $payload): string
{
    $target = env_string('TIMEFLOW_BETA_EMAIL');
    if ($target === '') {
        $target = 'michal@conceptfab.com';
    }

    if (!filter_var($target, FILTER_VALIDATE_EMAIL)) {
        return 'invalid_target';
    }

    $subject = 'TIMEFLOW beta - nowe zgłoszenie';
    $lines = [
        'Nowe zgłoszenie do testów beta TIMEFLOW',
        '',
        'Data: ' . ($payload['created_at'] ?? ''),
        'Imię / nick: ' . ($payload['name'] ?? ''),
        'E-mail: ' . ($payload['email'] ?? ''),
        'Branża: ' . ($payload['role'] ?? ''),
        'Potrzeby:',
        (string) ($payload['needs'] ?? ''),
        '',
        'Źródło: ' . ($payload['source'] ?? ''),
        'IP: ' . ($payload['remote_ip'] ?? ''),
        'UA: ' . ($payload['user_agent'] ?? ''),
    ];

    $message = implode("\r\n", $lines);

    $safeEmail = (string) ($payload['email'] ?? '');
    $safeEmail = str_replace(["\r", "\n"], '', $safeEmail);
    $rawHost = $_SERVER['HTTP_HOST'] ?? 'localhost';
    if (!is_string($rawHost) || trim($rawHost) === '') {
        $rawHost = 'localhost';
    }
    $hostNoPort = preg_replace('/:\d+$/', '', trim($rawHost));
    $hostSafe = preg_replace('/[^a-z0-9.-]/i', '', (string) $hostNoPort);
    if ($hostSafe === '') {
        $hostSafe = 'localhost';
    }

    $fromAddress = env_string('TIMEFLOW_BETA_EMAIL_FROM');
    if ($fromAddress === '' || !filter_var($fromAddress, FILTER_VALIDATE_EMAIL)) {
        $fromAddress = 'no-reply@conceptfab.com';
    }

    $fromNameRaw = env_string('TIMEFLOW_BETA_EMAIL_FROM_NAME');
    if ($fromNameRaw === '') {
        $fromNameRaw = 'TIMEFLOW Beta';
    }
    $fromNameSafe = str_replace(["\r", "\n"], '', $fromNameRaw);
    $fromHeader = 'From: ' . $fromAddress;
    if ($fromNameSafe !== '') {
        $fromHeader = 'From: =?UTF-8?B?' . base64_encode($fromNameSafe) . '?= <' . $fromAddress . '>';
    }

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        $fromHeader,
        'X-Mailer: TIMEFLOW Beta Form (PHP mail)',
    ];
    if ($safeEmail !== '' && filter_var($safeEmail, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $safeEmail;
    }

    $bcc = env_string('TIMEFLOW_BETA_EMAIL_BCC');
    if ($bcc !== '' && filter_var($bcc, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Bcc: ' . $bcc;
    }

    $sent = @mail($target, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, implode("\r\n", $headers));
    return $sent ? 'sent' : 'failed';
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(405, [
        'ok' => false,
        'message' => 'Metoda niedozwolona. Użyj POST.',
    ]);
}

$honeypot = str_field('fax_number', 255);
if ($honeypot !== '') {
    // Honeypot hit: udaj sukces, żeby nie dawać sygnału botom.
    respond(200, [
        'ok' => true,
        'message' => 'Dziękujemy. Zgłoszenie zostało zapisane.',
    ]);
}

$name = str_field('name', 120);
$email = str_field('email', 190);
$role = str_field('role', 120);
$needs = str_field('needs', 4000);
$source = str_field('source', 120);
$submittedAtIso = str_field('submitted_at_iso', 64);
$consent = bool_field('consent');

if ($name === '' || strlen($name) < 2) {
    respond(422, ['ok' => false, 'message' => 'Podaj imię lub nick (min. 2 znaki).']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'message' => 'Podaj poprawny adres e-mail.']);
}

if ($role === '') {
    respond(422, ['ok' => false, 'message' => 'Wybierz branżę.']);
}

if (!$consent) {
    respond(422, ['ok' => false, 'message' => 'Zaznacz zgodę na kontakt w sprawie testów beta.']);
}

$createdAt = gmdate('c');
$remoteIp = $_SERVER['REMOTE_ADDR'] ?? '';
$userAgent = (function (): string {
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
    if (!is_string($ua)) {
        return '';
    }
    return substr(trim($ua), 0, 500);
})();
$referer = (function (): string {
    $ref = $_SERVER['HTTP_REFERER'] ?? '';
    if (!is_string($ref)) {
        return '';
    }
    return substr(trim($ref), 0, 500);
})();

$storageDir = __DIR__ . DIRECTORY_SEPARATOR . 'storage';
$csvPath = $storageDir . DIRECTORY_SEPARATOR . 'beta-signups.csv';

try {
    ensure_storage_dir($storageDir);

    $record = [
        'created_at' => $createdAt,
        'name' => $name,
        'email' => $email,
        'role' => $role,
        'needs' => $needs,
        'consent' => $consent ? '1' : '0',
        'source' => $source,
        'submitted_at_iso' => $submittedAtIso,
        'remote_ip' => $remoteIp,
        'user_agent' => $userAgent,
        'referer' => $referer,
    ];

    append_csv_row($csvPath, array_values($record));
    $mailStatus = maybe_send_email($record);
    if (!in_array($mailStatus, ['sent', 'disabled'], true)) {
        error_log('[TIMEFLOW beta form] Mail notification status: ' . $mailStatus);
    }
} catch (Throwable $e) {
    respond(500, [
        'ok' => false,
        'message' => 'Nie udało się zapisać zgłoszenia. Sprawdź uprawnienia katalogu storage na hostingu PHP.',
        'error' => $e->getMessage(),
    ]);
}

respond(200, [
    'ok' => true,
    'message' => 'Dziękujemy. Zgłoszenie zostało zapisane. Skontaktujemy się po przygotowaniu kolejnych buildów beta.',
    'mail_status' => $mailStatus ?? 'disabled',
]);
