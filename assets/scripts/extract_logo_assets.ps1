$src = Join-Path $PSScriptRoot '..\images\source\duarte-jr-original.png'
$heroDst = Join-Path $PSScriptRoot '..\images\hero\hero-duarte-jr.jpg'
$logoDst = Join-Path $PSScriptRoot '..\images\logo-duarte-jr.png'
$footerDst = Join-Path $PSScriptRoot '..\images\logo-duarte-jr-footer.png'

Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile($src)
$w = $img.Width
$h = $img.Height
$heroRect = [System.Drawing.Rectangle]::new(0, 0, [int]([math]::Floor($w / 2)), [int]([math]::Floor($h / 2)))
$heroBmp = [System.Drawing.Bitmap]::new($heroRect.Width, $heroRect.Height)
$g = [System.Drawing.Graphics]::FromImage($heroBmp)
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($img, [System.Drawing.Rectangle]::new(0, 0, $heroRect.Width, $heroRect.Height), $heroRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

if (-not (Test-Path (Split-Path $heroDst))) {
    New-Item -ItemType Directory -Path (Split-Path $heroDst) | Out-Null
}

$heroRes = [System.Drawing.Bitmap]::new(1920, 700)
$g2 = [System.Drawing.Graphics]::FromImage($heroRes)
$g2.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g2.DrawImage($heroBmp, 0, 0, 1920, 700)
$g2.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85)
$heroRes.Save($heroDst, $codec, $params)
$heroBmp.Dispose()
$heroRes.Dispose()

$logo = [System.Drawing.Image]::FromFile($logoDst)
$fw = 320
$fh = [int]([math]::Floor($logo.Height * ($fw / $logo.Width)))
$footerBmp = [System.Drawing.Bitmap]::new($fw, $fh)
$g3 = [System.Drawing.Graphics]::FromImage($footerBmp)
$g3.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g3.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g3.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g3.DrawImage($logo, 0, 0, $fw, $fh)
$g3.Dispose()
$footerBmp.Save($footerDst, [System.Drawing.Imaging.ImageFormat]::Png)
$footerBmp.Dispose()
$logo.Dispose()
$img.Dispose()

Write-Host "Generated: $heroDst"
Write-Host "Generated: $footerDst"
