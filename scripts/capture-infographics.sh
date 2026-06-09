#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
cd ..

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed."
  echo "Install Node.js from https://nodejs.org/ and run this script again."
  exit 1
fi

if [[ ! -d node_modules/puppeteer ]]; then
  echo "Installing dependencies..."
  npm install
fi

echo
echo "Capturing infographic screenshots..."
npm run capture
echo
echo "Done. PNG files are in the screenshots folder."
