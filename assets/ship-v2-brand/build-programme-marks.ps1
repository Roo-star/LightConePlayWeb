# Offline vector typography derived from the supplied programme references.
# These are not represented as downloaded official logo master files.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$culture = [System.Globalization.CultureInfo]::InvariantCulture
function Fmt([double]$value) { return $value.ToString('0.###', $culture) }
function Outline-Mark([string]$label, [bool]$bold) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $family = New-Object System.Drawing.FontFamily('Arial')
    try {
        $weight = if ($bold) { 1 } else { 0 }
        $path.AddString($label, $family, $weight, 100, [System.Drawing.PointF]::new(0,0), [System.Drawing.StringFormat]::GenericTypographic)
        $points = $path.PathPoints
        $types = $path.PathTypes
        $data = [System.Text.StringBuilder]::new()
        for($i = 0; $i -lt $points.Length; $i++) {
            $kind = $types[$i] -band 7
            if($kind -eq 0) { [void]$data.Append(('M{0} {1}' -f (Fmt $points[$i].X),(Fmt $points[$i].Y))) }
            elseif($kind -eq 1) { [void]$data.Append(('L{0} {1}' -f (Fmt $points[$i].X),(Fmt $points[$i].Y))) }
            elseif($kind -eq 3) {
                [void]$data.Append(('C{0} {1} {2} {3} {4} {5}' -f (Fmt $points[$i].X),(Fmt $points[$i].Y),(Fmt $points[$i+1].X),(Fmt $points[$i+1].Y),(Fmt $points[$i+2].X),(Fmt $points[$i+2].Y)))
                $i += 2
            }
            if(($types[$i] -band 128) -ne 0) { [void]$data.Append('Z') }
        }
        return @{ Data=$data.ToString(); Bounds=$path.GetBounds() }
    } finally { $path.Dispose(); $family.Dispose() }
}
function Placed-Path($mark, [double]$x, [double]$y, [double]$width, [double]$height, [string]$fill) {
    $bounds = $mark.Bounds
    $matrix = '{0} 0 0 {1} {2} {3}' -f (Fmt ($width/$bounds.Width)),(Fmt ($height/$bounds.Height)),(Fmt ($x-$bounds.X*$width/$bounds.Width)),(Fmt ($y-$bounds.Y*$height/$bounds.Height))
    return '<path fill="'+$fill+'" fill-rule="evenodd" transform="matrix('+$matrix+')" d="'+$mark.Data+'"/>'
}
$micro = Outline-Mark 'MICRO FUND' $true
$microSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="840" height="126" viewBox="0 0 840 126"><title>MICRO FUND</title>' + (Placed-Path $micro 20 18 800 90 '#64d9ce') + '</svg>'
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'microfund.svg'),$microSvg,[Text.UTF8Encoding]::new($false))
$ideationSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="402" viewBox="0 0 640 402"><title>IDEATION FUNDING SCHEME</title>'
$ideationSvg += Placed-Path (Outline-Mark 'IDEATION' $false) 20 14 600 100 '#f5a447'
$ideationSvg += Placed-Path (Outline-Mark 'FUNDING' $false) 20 147 600 100 '#ff9774'
$ideationSvg += Placed-Path (Outline-Mark 'SCHEME' $false) 20 280 600 100 '#dfb680'
$ideationSvg += '</svg>'
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'ideation.svg'),$ideationSvg,[Text.UTF8Encoding]::new($false))
Write-Output 'Two reference-derived outlined programme marks written; no external fonts needed at runtime.'
