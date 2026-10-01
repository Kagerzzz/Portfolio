const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const TEMP_DIR = path.join(__dirname, 'temp_favicon_gen');

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

// Ultra-Large Neubrutalist Favicon SVG
// Maximized badge area (57x57), tight 2px shadow, giant bold 'H' (+50% scale), and prominent '✦' sparkle.
const faviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <!-- Tight Neubrutalist Hard Shadow (No wasted canvas padding) -->
  <rect x="4" y="4" width="57" height="57" rx="16" fill="#000000" />
  
  <!-- Ultra-wide Badge Face (57x57 in 64x64 canvas) -->
  <rect x="2" y="2" width="57" height="57" rx="16" fill="#FFDE59" stroke="#000000" stroke-width="4" />
  
  <!-- Massive Chunky 'H' for instant 16x16 tab legibility -->
  <path d="M 14 14 L 23 14 L 23 27 L 36 27 L 36 14 L 45 14 L 45 47 L 36 47 L 36 35 L 23 35 L 23 47 L 14 47 Z" fill="#000000" />
  
  <!-- Signature 4-pointed Sparkle Star ✦ (Neo-Cyan with Black Ink Stroke) -->
  <path d="M 51 9 C 51 18 54 21 62 21 C 54 21 51 24 51 33 C 51 24 48 21 40 21 C 48 21 51 18 51 9 Z" 
        fill="#00F0FF" stroke="#000000" stroke-width="2.2" stroke-linejoin="round" />
</svg>`;

// Write primary SVG files
fs.writeFileSync(path.join(ASSETS_DIR, 'favicon.svg'), faviconSVG);
fs.writeFileSync(path.join(ROOT_DIR, 'favicon.svg'), faviconSVG);

function getFaviconHTML(size) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body {
    width: ${size}px;
    height: ${size}px;
    background: transparent;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
</head>
<body>
  ${faviconSVG}
</body>
</html>`;
}

const RENDERS = [
  { name: 'favicon-16x16.png', size: 16, dests: [ASSETS_DIR] },
  { name: 'favicon-32x32.png', size: 32, dests: [ASSETS_DIR, ROOT_DIR] },
  { name: 'apple-touch-icon.png', size: 180, dests: [ASSETS_DIR, ROOT_DIR] },
  { name: 'favicon.ico', size: 32, dests: [ROOT_DIR] }
];

for (const item of RENDERS) {
  const htmlFile = path.join(TEMP_DIR, `${item.name}.html`);
  fs.writeFileSync(htmlFile, getFaviconHTML(item.size), 'utf8');
  
  const tempPng = path.join(TEMP_DIR, `${item.name}.png`);
  const cmd = `"${EDGE_PATH}" --headless=new --screenshot="${tempPng}" --window-size=${item.size},${item.size} --default-background-color=00000000 --hide-scrollbars "file:///${htmlFile.replace(/\\\\/g, '/')}"`;
  
  try {
    execSync(cmd, { stdio: 'ignore' });
    if (fs.existsSync(tempPng)) {
      for (const dest of item.dests) {
        fs.copyFileSync(tempPng, path.join(dest, item.name));
      }
      console.log(`✔ Generated ${item.name} (${item.size}x${item.size})`);
    }
  } catch (err) {
    console.error(`✖ Error generating ${item.name}:`, err.message);
  }
}

try {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
} catch (e) {}

console.log('Production favicon generation complete.');
