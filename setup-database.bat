@echo off
chcp 65001
cls
echo ==========================================
echo  Ayurmeda Database Setup Script
echo ==========================================
echo.

REM Check if pnpm is available
where pnpm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] pnpm is not installed. Installing...
    npm install -g pnpm
)

echo [1/5] Installing database dependencies...
cd packages\database
call pnpm install
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Generating Prisma Client...
call pnpm db:generate
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to generate Prisma client
    pause
    exit /b 1
)

echo.
echo [3/5] Pushing database schema...
call pnpm db:push
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to push schema to database
    echo Make sure PostgreSQL is running and database 'ayurmeda' exists
    pause
    exit /b 1
)

echo.
echo [4/5] Seeding database...
call pnpm db:seed
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to seed database
    pause
    exit /b 1
)

echo.
echo [5/5] Setup complete!
echo.
echo ==========================================
echo  Database setup successful!
echo ==========================================
echo.
echo Default Login Credentials:
echo   Super Admin: admin@ayurmeda.com / admin123
echo   Doctor:      doctor@ayurmeda.com / admin123
echo.
echo Next steps:
echo   1. Start API:  pnpm --filter @ayurmantra/api dev
echo   2. Start Web:  pnpm --filter @ayurmantra/web dev
echo   3. Open:      http://localhost:2900
echo.
pause
