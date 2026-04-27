<?php
declare(strict_types=1);

/**
 * Minimal MCP-over-HTTP server for TIMEFLOW landing page.
 * JSON-RPC 2.0 over Streamable HTTP transport (MCP revision 2025-03-26).
 * Read-only — no tool mutates state, so no auth required.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
header('Access-Control-Allow-Headers: Content-Type, MCP-Protocol-Version, Mcp-Session-Id');
header('Access-Control-Expose-Headers: Mcp-Session-Id');
header('Cache-Control: no-store');

const PROTOCOL_VERSION = '2025-03-26';
const SUPPORTED_PROTOCOL_VERSIONS = ['2025-03-26', '2024-11-05'];

const SERVER_INFO = [
    'name' => 'timeflow-mcp',
    'version' => '1.0.0',
];

const PRODUCT_INFO = [
    'name' => 'TIMEFLOW',
    'currentVersion' => '0.1.6',
    'currentBuild' => '0.1.556',
    'stage' => 'beta',
    'tagline' => 'Native desktop time tracker for freelancers and small studios billing time to clients.',
    'description' => 'Local-first time tracker. Data stays on the user\'s disk. Optional sync via LAN (peer-to-peer) or Online (SFTP with AES-256-GCM end-to-end encryption). Local AI learns habits and assigns sessions without sending data to the cloud. Fair Time Algorithm eliminates double-counting during multitasking.',
    'website' => 'https://timeflow.conceptfab.com/',
    'languages' => ['pl', 'en'],
    'license' => 'Proprietary, free during beta',
    'vendor' => [
        'name' => 'CONCEPTFAB',
        'website' => 'https://conceptfab.com/',
    ],
];

const PLATFORMS = [
    ['os' => 'Windows', 'status' => 'live', 'note' => 'Stable desktop workflow.'],
    ['os' => 'macOS', 'status' => 'live', 'note' => 'Stable desktop workflow.'],
    ['os' => 'Linux', 'status' => 'planned', 'note' => 'On the roadmap.'],
    ['os' => 'iOS / mobile', 'status' => 'planned', 'note' => 'On the roadmap.'],
];

const FEATURES = [
    ['id' => 'fair-time-algorithm', 'name' => 'Fair Time Algorithm', 'description' => 'Eliminates double-counting when multitasking across projects.'],
    ['id' => 'local-ai', 'name' => 'Local AI assignment', 'description' => 'On-device model learns habits and auto-assigns sessions to projects without sending data to the cloud.'],
    ['id' => 'lan-sync', 'name' => 'LAN sync', 'description' => 'Peer-to-peer sync within local network. Free.'],
    ['id' => 'online-sync', 'name' => 'Online sync', 'description' => 'Server coordinates; data transferred over SFTP with AES-256-GCM end-to-end encryption. Server sees only metadata.'],
    ['id' => 'manual-sessions', 'name' => 'Manual sessions', 'description' => 'Track meetings, calls, and offline activities; integrated with reports, quotes, and sync.'],
    ['id' => 'reports-quotes', 'name' => 'Reports and quotes', 'description' => 'Generate billing reports and project quotes from logged sessions.'],
    ['id' => 'offline-first', 'name' => 'Offline-first', 'description' => 'Runs without internet. Sync is optional.'],
];

const FAQ = [
    ['q' => 'Czy TIMEFLOW działa offline?', 'a' => 'Tak. TIMEFLOW działa lokalnie — dane siedzą na Twoim dysku. Sync online jest opcjonalny.', 'lang' => 'pl'],
    ['q' => 'Kto może dołączyć do testów beta?', 'a' => 'Priorytet mają freelancerzy i małe studia rozliczające czas z klientami, ale formularz jest otwarty dla każdego.', 'lang' => 'pl'],
    ['q' => 'Na jakiej platformie działa beta?', 'a' => 'Windows i macOS. W roadmapie: Linux i aplikacja mobilna.', 'lang' => 'pl'],
    ['q' => 'Czy udział w becie jest płatny?', 'a' => 'Nie. Beta jest za darmo — zbieramy feedback do kolejnych iteracji.', 'lang' => 'pl'],
    ['q' => 'Jak działa synchronizacja w TIMEFLOW?', 'a' => 'Dwa tryby: LAN sync (peer-to-peer w sieci lokalnej, darmowy) i Online sync (serwer koordynuje, transfer SFTP z AES-256-GCM). Serwer widzi tylko metadane — treść bazy jest szyfrowana end-to-end i trafia na wydzielony storage.', 'lang' => 'pl'],
    ['q' => 'Czym TIMEFLOW różni się od Toggl, Clockify i Harvest?', 'a' => 'TIMEFLOW to natywna apka desktopowa — nie wymaga konta, przeglądarki ani neta. Dane zostają na komputerze. Fair Time Algorithm eliminuje podwójne liczenie przy multitaskingu. Lokalne AI uczy się nawyków i przypisuje sesje bez wysyłania danych do chmury.', 'lang' => 'pl'],
    ['q' => 'Czy mogę rejestrować czas spotkań i rozmów?', 'a' => 'Tak. Sesje manualne obsługują spotkania, telefony i inne aktywności offline. W pełni zintegrowane z raportami, wycenami i syncem.', 'lang' => 'pl'],
];

const HELP_TOPICS = [
    ['lang' => 'pl', 'url' => 'https://timeflow.conceptfab.com/pomoc.md', 'title' => 'Pomoc TIMEFLOW (PL)', 'topics' => ['quick start', 'dashboard', 'sesje', 'projekty', 'AI', 'dane', 'daemon', 'ustawienia']],
    ['lang' => 'en', 'url' => 'https://timeflow.conceptfab.com/en/help.md', 'title' => 'TIMEFLOW Help (EN)', 'topics' => ['quick start', 'dashboard', 'sessions', 'projects', 'AI', 'data', 'daemon', 'settings']],
    ['lang' => 'pl', 'url' => 'https://timeflow.conceptfab.com/aktualizacje.md', 'title' => 'Changelog TIMEFLOW (PL)', 'topics' => ['0.1.6 release notes', 'archive 0.1.5']],
    ['lang' => 'en', 'url' => 'https://timeflow.conceptfab.com/en/updates.md', 'title' => 'TIMEFLOW Changelog (EN)', 'topics' => ['0.1.6 release notes', 'archive 0.1.5']],
    ['lang' => 'pl', 'url' => 'https://timeflow.conceptfab.com/polityka-prywatnosci.md', 'title' => 'Polityka prywatności (PL)', 'topics' => ['privacy', 'beta form data processing']],
    ['lang' => 'en', 'url' => 'https://timeflow.conceptfab.com/en/privacy-policy.md', 'title' => 'Privacy Policy (EN)', 'topics' => ['privacy', 'beta form data processing']],
];

function tools(): array
{
    return [
        [
            'name' => 'get-product-info',
            'description' => 'Return TIMEFLOW product identity (name, current version and build, stage, tagline, description, supported languages, vendor, website).',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
        ],
        [
            'name' => 'get-platforms',
            'description' => 'Return supported and planned desktop/mobile platforms for TIMEFLOW with their status (live or planned).',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
        ],
        [
            'name' => 'get-features',
            'description' => 'Return the list of TIMEFLOW key features (Fair Time Algorithm, local AI, LAN/online sync, manual sessions, reports/quotes, offline-first).',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
        ],
        [
            'name' => 'get-faq',
            'description' => 'Return the TIMEFLOW landing page FAQ (questions and answers).',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
        ],
        [
            'name' => 'get-help-topics',
            'description' => 'Return the list of TIMEFLOW help / changelog / privacy documents available as Markdown for AI agents, with their URLs and topic tags.',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
        ],
        [
            'name' => 'get-beta-info',
            'description' => 'Return information about the TIMEFLOW beta program: how to apply, what data the form collects, where to read the privacy policy.',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
        ],
    ];
}

function jsonRpcResponse($id, $result): array
{
    return ['jsonrpc' => '2.0', 'id' => $id, 'result' => $result];
}

function jsonRpcError($id, int $code, string $message, $data = null): array
{
    $error = ['code' => $code, 'message' => $message];
    if ($data !== null) {
        $error['data'] = $data;
    }
    return ['jsonrpc' => '2.0', 'id' => $id, 'error' => $error];
}

function asTextContent($value): array
{
    $text = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    return [
        'content' => [['type' => 'text', 'text' => $text]],
        'isError' => false,
    ];
}

function callTool(string $name, array $args): array
{
    switch ($name) {
        case 'get-product-info':
            return asTextContent(PRODUCT_INFO);
        case 'get-platforms':
            return asTextContent(PLATFORMS);
        case 'get-features':
            return asTextContent(FEATURES);
        case 'get-faq':
            return asTextContent(FAQ);
        case 'get-help-topics':
            return asTextContent(HELP_TOPICS);
        case 'get-beta-info':
            return asTextContent([
                'apply' => 'POST application/x-www-form-urlencoded to https://timeflow.conceptfab.com/form-handler.php',
                'fields' => ['name', 'email', 'role', 'needs', 'consent', 'fax_number (honeypot, MUST be empty)'],
                'openapi' => 'https://timeflow.conceptfab.com/api/openapi.json',
                'privacyPolicy' => [
                    'pl' => 'https://timeflow.conceptfab.com/polityka-prywatnosci.html',
                    'en' => 'https://timeflow.conceptfab.com/en/privacy-policy.html',
                ],
                'note' => 'Beta is free. Priority for freelancers and small studios billing time to clients, but the form is open to anyone.',
            ]);
    }
    return [
        'content' => [['type' => 'text', 'text' => "Unknown tool: {$name}."]],
        'isError' => true,
    ];
}

function handleMessage(array $message): ?array
{
    $id = $message['id'] ?? null;
    $method = (string)($message['method'] ?? '');
    $params = $message['params'] ?? [];
    $isNotification = !array_key_exists('id', $message);

    if ($method === '') {
        return $isNotification ? null : jsonRpcError($id, -32600, 'Invalid Request: missing method.');
    }

    switch ($method) {
        case 'initialize':
            $clientProtocol = (string)($params['protocolVersion'] ?? PROTOCOL_VERSION);
            $negotiated = in_array($clientProtocol, SUPPORTED_PROTOCOL_VERSIONS, true)
                ? $clientProtocol
                : PROTOCOL_VERSION;
            return jsonRpcResponse($id, [
                'protocolVersion' => $negotiated,
                'capabilities' => ['tools' => ['listChanged' => false]],
                'serverInfo' => SERVER_INFO,
                'instructions' => 'Read-only MCP server for the TIMEFLOW landing page. Use tools/list to discover tools — product info, platforms, features, FAQ, help topics, beta program. To apply for beta, see the get-beta-info tool or POST to /form-handler.php (OpenAPI at /api/openapi.json).',
            ]);

        case 'notifications/initialized':
        case 'notifications/cancelled':
        case 'notifications/progress':
            return null;

        case 'ping':
            return jsonRpcResponse($id, new stdClass());

        case 'tools/list':
            return jsonRpcResponse($id, ['tools' => tools()]);

        case 'tools/call':
            $name = (string)($params['name'] ?? '');
            $args = $params['arguments'] ?? [];
            if (!is_array($args)) {
                $args = [];
            }
            $known = array_column(tools(), 'name');
            if (!in_array($name, $known, true)) {
                return jsonRpcError($id, -32602, "Unknown tool: {$name}.");
            }
            return jsonRpcResponse($id, callTool($name, $args));

        case 'resources/list':
        case 'prompts/list':
            $key = strtok($method, '/');
            return jsonRpcResponse($id, [$key => []]);

        default:
            if ($isNotification) {
                return null;
            }
            return jsonRpcError($id, -32601, "Method not found: {$method}.");
    }
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET') {
    echo json_encode([
        'serverInfo' => SERVER_INFO,
        'protocolVersion' => PROTOCOL_VERSION,
        'transport' => 'streamable-http',
        'usage' => 'POST a JSON-RPC 2.0 message to this endpoint. Start with method "initialize".',
        'serverCard' => 'https://timeflow.conceptfab.com/.well-known/mcp/server-card.json',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(jsonRpcError(null, -32600, "Method not allowed: {$method}. Use POST."));
    exit;
}

$rawBody = file_get_contents('php://input');
if (!is_string($rawBody) || $rawBody === '') {
    http_response_code(400);
    echo json_encode(jsonRpcError(null, -32700, 'Empty request body.'));
    exit;
}

$payload = json_decode($rawBody, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(jsonRpcError(null, -32700, 'Parse error: invalid JSON.'));
    exit;
}

$isBatch = !empty($payload) && array_keys($payload) === range(0, count($payload) - 1);
$messages = $isBatch ? $payload : [$payload];

$responses = [];
foreach ($messages as $msg) {
    if (!is_array($msg)) {
        $responses[] = jsonRpcError(null, -32600, 'Invalid Request: not an object.');
        continue;
    }
    $reply = handleMessage($msg);
    if ($reply !== null) {
        $responses[] = $reply;
    }
}

if (empty($responses)) {
    http_response_code(202);
    exit;
}

echo json_encode(
    $isBatch ? $responses : $responses[0],
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);
