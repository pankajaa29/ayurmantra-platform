# PowerShell Script to Install PostgreSQL and Setup Ayurmeda Database
# Run as Administrator

param(
    [string]$PostgresVersion = "16.4-1",
    [string]$InstallDir = "C:\Program Files\PostgreSQL\16",
    [string]$DataDir = "C:\Program Files\PostgreSQL\16\data",
    [string]$Password = "postgres"
)

$ErrorActionPreference = "Stop"

function Write-Status($message) {
    Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] $message" -ForegroundColor Cyan
}

function Write-Success($message) {
    Write-Host "[✓] $message" -ForegroundColor Green
}

function Write-Error($message) {
    Write-Host "[✗] $message" -ForegroundColor Red
}

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Error "Please run this script as Administrator!`nRight-click on PowerShell and select 'Run as Administrator'"
    exit 1
}

Write-Status "Starting PostgreSQL Installation for Ayurmeda..."

# Step 1: Download PostgreSQL Installer
$downloadUrl = "https://get.enterprisedb.com/postgresql/postgresql-$PostgresVersion-windows-x64.exe"
$installerPath = "$env:TEMP\postgresql-installer.exe"

Write-Status "Downloading PostgreSQL $PostgresVersion..."
try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath -UseBasicParsing
    Write-Success "Downloaded PostgreSQL installer"
} catch {
    Write-Error "Failed to download PostgreSQL. Error: $_"
    exit 1
}

# Step 2: Install PostgreSQL Silently
Write-Status "Installing PostgreSQL (this may take a few minutes)..."
$installArgs = @(
    "--mode unattended",
    "--unattendedmodeui minimal",
    "--superaccount postgres",
    "--superpassword $Password",
    "--serverport 5432",
    "--prefix `"$InstallDir`"",
    "--datadir `"$DataDir`"",
    "--install_plpgsql 1"
) -join " "

try {
    $process = Start-Process -FilePath $installerPath -ArgumentList $installArgs -Wait -PassThru
    if ($process.ExitCode -ne 0) {
        Write-Error "PostgreSQL installation failed with exit code: $($process.ExitCode)"
        exit 1
    }
    Write-Success "PostgreSQL installed successfully"
} catch {
    Write-Error "Installation failed. Error: $_"
    exit 1
}

# Step 3: Add PostgreSQL to System PATH
Write-Status "Configuring System PATH..."
$pgBinPath = "$InstallDir\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
if ($currentPath -notlike "*$pgBinPath*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$pgBinPath", "Machine")
    Write-Success "Added PostgreSQL to PATH"
} else {
    Write-Success "PostgreSQL already in PATH"
}

# Step 4: Create Database
Write-Status "Creating Ayurmeda Database..."
$env:PGPASSWORD = $Password

# Wait for PostgreSQL service to start
$maxAttempts = 30
$attempt = 0
$serviceStarted = $false

do {
    $attempt++
    $service = Get-Service -Name "postgresql-x64-*" -ErrorAction SilentlyContinue
    if ($service -and $service.Status -eq "Running") {
        $serviceStarted = $true
        break
    }
    Write-Host "Waiting for PostgreSQL service to start... ($attempt/$maxAttempts)"
    Start-Sleep -Seconds 2
} while ($attempt -lt $maxAttempts)

if (-not $serviceStarted) {
    Write-Error "PostgreSQL service failed to start"
    exit 1
}

# Create database using psql
$dbCreateScript = @"
CREATE DATABASE ayurmeda;
\c ayurmeda;
"@

try {
    $dbCreateScript | & "$InstallDir\bin\psql.exe" -U postgres -h localhost -p 5432
    Write-Success "Created ayurmeda database"
} catch {
    Write-Warning "Database may already exist or creation had issues. Continuing..."
}

# Step 5: Configure pg_hba.conf for easier local access
Write-Status "Configuring PostgreSQL for local access..."
$hbaConfPath = "$DataDir\pg_hba.conf"
if (Test-Path $hbaConfPath) {
    $backupPath = "$hbaConfPath.backup.$(Get-Date -Format 'yyyyMMddHHmmss')"
    Copy-Item $hbaConfPath $backupPath -Force
    
    # Update authentication method to trust for local connections
    $hbaContent = Get-Content $hbaConfPath
    $hbaContent = $hbaContent -replace 'scram-sha-256', 'trust'
    $hbaContent = $hbaContent -replace 'md5', 'trust'
    Set-Content $hbaConfPath $hbaContent
    
    # Restart PostgreSQL service
    Restart-Service -Name "postgresql-x64-*" -Force
    Start-Sleep -Seconds 3
    
    Write-Success "Configured PostgreSQL for local development"
}

# Step 6: Create .env file with correct password
Write-Status "Creating environment configuration..."
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$envContent = @"
# Database
DATABASE_URL="postgresql://postgres:$Password@localhost:5432/ayurmeda?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# API
PORT=2600
API_URL=http://localhost:2600

# Frontend URLs
NEXT_PUBLIC_API_URL=http://localhost:2600/api/v1
ALLOWED_ORIGINS=http://localhost:2900,http://localhost:2800,http://localhost:2700

# App
NODE_ENV=development
"@

$envPath = Join-Path $projectDir ".env"
Set-Content -Path $envPath -Value $envContent -Force
Write-Success "Created .env file with database credentials"

# Step 7: Run Prisma Setup
Write-Status "Setting up Prisma..."
Set-Location $projectDir

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Status "Installing dependencies (this may take a few minutes)..."
    & "npm" install -g pnpm
    & "pnpm" install
}

# Navigate to database package and run setup
$dbPackageDir = Join-Path $projectDir "packages\database"
Set-Location $dbPackageDir

Write-Status "Generating Prisma Client..."
& "pnpm" db:generate

Write-Status "Pushing database schema..."
& "pnpm" db:push --accept-data-loss

Write-Status "Seeding database with sample data..."
& "pnpm" db:seed

Write-Success "Database setup completed!"

# Summary
Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "  PostgreSQL Installation Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "`nInstallation Details:"
Write-Host "  PostgreSQL Version: $PostgresVersion"
Write-Host "  Install Location: $InstallDir"
Write-Host "  Data Directory: $DataDir"
Write-Host "  Username: postgres"
Write-Host "  Password: $Password"
Write-Host "  Database: ayurmeda"
Write-Host "  Port: 5432"
Write-Host "`nDefault Login Credentials:"
Write-Host "  Super Admin: admin@ayurmeda.com / admin123"
Write-Host "  Doctor:      doctor@ayurmeda.com / admin123"
Write-Host "`nNext Steps:"
Write-Host "  1. Start API:  pnpm --filter @ayurmantra/api dev"
Write-Host "  2. Start Web:  pnpm --filter @ayurmantra/web dev"
Write-Host "  3. Open:      http://localhost:2900"
Write-Host "`n==========================================" -ForegroundColor Green

# Cleanup
Remove-Item $installerPath -Force -ErrorAction SilentlyContinue

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
