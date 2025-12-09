$ini = ".\desktop.ini"

if (Test-Path $ini) {
    attrib +s +h $ini  
    attrib +s "."         
    Write-Host "Custom icon applied successfully."
} else {
    Write-Host "desktop.ini not found!"
}

Write-Host "Restart Explorer or the folder window to see the icon."
