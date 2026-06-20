const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// Regex to capture the entire Project Detail Overlay block
const overlayRegex = /[\t ]*<!-- Project Detail Overlay -->[\s\S]*?<div id="projOverlay" class="proj-overlay">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const match = html.match(overlayRegex);

if (match) {
  const overlayHtml = match[0];
  
  // Remove it from its current position
  html = html.replace(overlayRegex, '');
  
  // Find where to inject it (before the scripts at the bottom)
  const injectRegex = /<!-- Floating WhatsApp -->/;
  if (html.match(injectRegex)) {
    html = html.replace(injectRegex, overlayHtml + '\n\n<!-- Floating WhatsApp -->');
    fs.writeFileSync('index.html', html, 'utf-8');
    console.log('Successfully moved projOverlay out of main to fix z-index stacking!');
  } else {
    console.log('Could not find injection point');
  }
} else {
  console.log('Could not find overlay block');
}
