const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// 1. Update cursor to be 'difference' blend mode for premium feel
const oldCursor = /\/\* ── CUSTOM CURSOR ───────────────────────────────── \*\/[\s\S]*?@media \(hover:none\) \{ #cursor,#cursorDot \{ display:none; \} \}/;

const newCursor = `/* ── CUSTOM CURSOR ───────────────────────────────── */
#cursor { position:fixed; width:34px; height:34px; border:1.5px solid rgba(255,255,255,0.8); border-radius:50%; pointer-events:none; z-index:99999; transition:transform .13s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity .2s; transform:translate(-50%,-50%); opacity:0; mix-blend-mode: difference; }
#cursorDot { position:fixed; width:6px; height:6px; background:#fff; border-radius:50%; pointer-events:none; z-index:99999; transform:translate(-50%,-50%); transition:transform .06s; opacity:0; mix-blend-mode: difference; }
body:hover #cursor, body:hover #cursorDot { opacity:1; }
@media (hover:none) { #cursor,#cursorDot { display:none; } }`;

css = css.replace(oldCursor, newCursor);

// 2. Add film grain noise overlay
if (!css.includes('feTurbulence')) {
  css += `
/* ── PREMIUM NOISE OVERLAY ───────────────────────── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 99998;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.045;
}
`;
}

// 3. Add shine effect to primary button
if (!css.includes('.btn-p::after')) {
  css += `
/* ── BUTTON SHINE ───────────────────────── */
.btn-p {
  position: relative;
  overflow: hidden;
}
.btn-p::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent);
  transform: skewX(-25deg);
  animation: shine 4s infinite;
}
@keyframes shine {
  0% { left: -100%; }
  20% { left: 200%; }
  100% { left: 200%; }
}
`;
}

// 4. Enhance glassmorphism border to emulate apple-style inner highlight
const glassReplace = `box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), var(--sh)`;
css = css.replace(/box-shadow:var\(--sh\);/g, glassReplace + ';');

fs.writeFileSync('style.css', css, 'utf-8');
console.log('Premium CSS tweaks applied.');
