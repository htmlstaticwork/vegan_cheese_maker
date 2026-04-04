$files = Get-ChildItem *.html
$svgPattern = '(?s)<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"\s*stroke-linecap="round" stroke-linejoin="round" class="logo-icon">.*?</svg>'
$replacement = '<img src="favicon.png" alt="Cheevo Logo" class="logo-icon-img">'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = [regex]::Replace($content, $svgPattern, $replacement)
    $newContent | Set-Content -Path $file.FullName -Encoding UTF8
}
