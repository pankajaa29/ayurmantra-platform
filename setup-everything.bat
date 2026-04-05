@echo off
echo ==========================================
echo  Ayurmeda - Complete Setup
echo ==========================================
echo.
echo This script will:
echo   1. Install PostgreSQL 16
echo   2. Create ayurmeda database
echo   3. Configure environment
echo   4. Run Prisma migrations
echo   5. Seed database with sample data
echo.
echo IMPORTANT: Run this as Administrator!
echo ==========================================
echo.

:: Check if running as admin
net session >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Please run this script as Administrator!
    echo Right-click on this file and select 'Run as Administrator'
    pause
    exit /b 1
)

:: Change to script directory
cd /d "%~dp0"

:: Run PowerShell script
echo Starting setup...
echo.

powershell -ExecutionPolicy Bypass -File "install-postgresql.ps1"

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Setup failed!
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
pause
