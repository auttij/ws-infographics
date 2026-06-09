@echo off
setlocal

cd /d "%~dp0"
cd /d ".."

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed.
  echo Please install Node.js from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\puppeteer" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo.
echo Capturing infographic screenshots...
call npm run capture
if errorlevel 1 (
  echo.
  echo Capture failed.
  pause
  exit /b 1
)

echo.
echo Done. PNG files are in the screenshots folder.
pause
