# WS Infographics

A collection of Walkscape related infographics, with some tools and templates for making them.

## Screenshots
Taking screenshots with a script is preferred for consistency.

Prerequisite: Node.js must be installed: https://nodejs.org/en/download

### Easiest way for contributors
Windows:
```
double-click scripts/capture-infographics.bat
```

macOS/Linux:
```
./scripts/capture-infographics.sh
```

Both helper scripts will install dependencies automatically on first run.

### Manual commands
Install dependencies:
```
npm install
```

Capture all `.html` files in `infographics/`:
```
npm run capture
```