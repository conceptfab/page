# Fix styles.css - add li rule after .tf-style block
$cssPath = "f:\___APPS\__TimeFlow\page\styles.css"
$cssLines = [System.Collections.Generic.List[string]]::new([System.IO.File]::ReadAllLines($cssPath))

# Find the closing } of .tf-style (line 37, 0-indexed = 36)
$insertIdx = 37  # after line 37 (0-indexed)
$cssLines.Insert($insertIdx, '')
$cssLines.Insert($insertIdx + 1, 'li {')
$cssLines.Insert($insertIdx + 2, '  font-weight: 200 !important;')
$cssLines.Insert($insertIdx + 3, '  color: #fff !important;')
$cssLines.Insert($insertIdx + 4, '}')

[System.IO.File]::WriteAllLines($cssPath, $cssLines.ToArray())
Write-Host "styles.css updated"

# Fix en/index.html - remove footer brand-mark (line 1104, 0-indexed = 1103)
$htmlPath = "f:\___APPS\__TimeFlow\page\en\index.html"
$htmlLines = [System.Collections.Generic.List[string]]::new([System.IO.File]::ReadAllLines($htmlPath))
$htmlLines.RemoveAt(1103)
[System.IO.File]::WriteAllLines($htmlPath, $htmlLines.ToArray())
Write-Host "en/index.html updated"
