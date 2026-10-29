# PowerShell script to create clean, high-performance zip archives
# Packages files inside a single parent folder so extraction never litters the user's directory.

$ErrorActionPreference = "Stop"
$rootDir = (Get-Item .).FullName

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "   SHUBH MUHURAT MATRIMONIAL - ZIP BACKUP       " -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

$baseStage = Join-Path $rootDir "backup_staging_temp"
if (Test-Path $baseStage) { 
    Remove-Item -Recurse -Force $baseStage -ErrorAction SilentlyContinue 
}

$fullStage = Join-Path $baseStage "Shubh_Muhurat_Complete_Project"
$feStage   = Join-Path $baseStage "Shubh_Muhurat_Frontend"
$beStage   = Join-Path $baseStage "Shubh_Muhurat_Backend"

$fullFe = Join-Path $fullStage "matrimonial-client"
$fullBe = Join-Path $fullStage "Matrimonial-server"

New-Item -ItemType Directory -Path $fullFe -Force | Out-Null
New-Item -ItemType Directory -Path $fullBe -Force | Out-Null
New-Item -ItemType Directory -Path $feStage -Force | Out-Null
New-Item -ItemType Directory -Path $beStage -Force | Out-Null

# 1. Staging Frontend Source (Excluding node_modules, dist, .git, etc.)
Write-Host "[1/4] Staging Frontend (matrimonial-client)..." -ForegroundColor Yellow
robocopy "matrimonial-client" $fullFe /E /XD "node_modules" "dist" ".git" ".cache" /XF "*.zip" "*.log" | Out-Null
robocopy "matrimonial-client" $feStage /E /XD "node_modules" "dist" ".git" ".cache" /XF "*.zip" "*.log" | Out-Null

# 2. Staging Backend Source (Excluding node_modules, .git, temp debug logs, etc.)
Write-Host "[2/4] Staging Backend (Matrimonial-server with MVC architecture)..." -ForegroundColor Yellow
robocopy "Matrimonial-server" $fullBe /E /XD "node_modules" ".git" ".vercel" /XF "*.zip" "*.log" "vercel_crash.json" | Out-Null
robocopy "Matrimonial-server" $beStage /E /XD "node_modules" ".git" ".vercel" /XF "*.zip" "*.log" "vercel_crash.json" | Out-Null

# 3. Root Level Master Documentation & Configs
Write-Host "[3/4] Copying root documentation..." -ForegroundColor Yellow
Copy-Item "README.md" "$fullStage\" -Force -ErrorAction SilentlyContinue
Copy-Item "PROJECT_SETUP_AND_BACKUP_GUIDE.md" "$fullStage\" -Force -ErrorAction SilentlyContinue
Copy-Item ".gitignore" "$fullStage\" -Force -ErrorAction SilentlyContinue

# 4. Generating Windows Native Compress-Archive ZIPs
Write-Host "[4/4] Creating ZIP Archives..." -ForegroundColor Yellow

# Master Full Project ZIP
$fullZip = Join-Path $rootDir "Matrimonial_Full_Project_Backup.zip"
if (Test-Path $fullZip) { Remove-Item $fullZip -Force }
Compress-Archive -Path $fullStage -DestinationPath $fullZip -Force
Write-Host "  -> Master Full Project: $fullZip" -ForegroundColor Green

# Frontend Only ZIP
$feZip = Join-Path $rootDir "Matrimonial_Frontend_Source_Backup.zip"
if (Test-Path $feZip) { Remove-Item $feZip -Force }
Compress-Archive -Path $feStage -DestinationPath $feZip -Force
Write-Host "  -> Frontend Source: $feZip" -ForegroundColor Green

# Backend Only ZIP
$beZip = Join-Path $rootDir "Matrimonial_Backend_Source_Backup.zip"
if (Test-Path $beZip) { Remove-Item $beZip -Force }
Compress-Archive -Path $beStage -DestinationPath $beZip -Force
Write-Host "  -> Backend Source: $beZip" -ForegroundColor Green

# Cleanup Staging Directory
Remove-Item -Recurse -Force $baseStage -ErrorAction SilentlyContinue

Write-Host "=================================================" -ForegroundColor Green
Write-Host "   All ZIP Archives Successfully Generated!     " -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
