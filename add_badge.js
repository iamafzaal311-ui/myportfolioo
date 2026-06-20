const fs = require('fs');

// 1. Modify index.html
let html = fs.readFileSync('index.html', 'utf-8');
const photoBadgeHtml = `<div class="photo-badge"><span class="pulse-dot"></span> Open to Work</div>`;
const eduBadgeHtml = `
            <div class="edu-badge">
              <div class="edu-icon"><i class="fa-solid fa-graduation-cap"></i></div>
              <div class="edu-text">
                <strong>BS IT Completed</strong>
                <span>Diploma in Flutter Dev</span>
              </div>
            </div>`;

if (html.includes(photoBadgeHtml) && !html.includes('edu-badge')) {
  html = html.replace(photoBadgeHtml, photoBadgeHtml + eduBadgeHtml);
  fs.writeFileSync('index.html', html, 'utf-8');
  console.log('Added edu-badge to index.html');
} else {
  console.log('Could not find photo-badge or edu-badge already exists.');
}

// 2. Modify style.css
let css = fs.readFileSync('style.css', 'utf-8');
if (!css.includes('.edu-badge')) {
  const cssToAdd = `
/* ── AESTHETIC EDUCATION BADGE ────────────────────────────── */
.edu-badge {
  position: absolute;
  bottom: 0px;
  left: -60px;
  background: rgba(15, 15, 20, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 12px 40px rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 3;
  animation: floatEdu 4.5s ease-in-out infinite;
  white-space: nowrap;
}

@keyframes floatEdu {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}

.edu-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--purple), var(--pink));
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  box-shadow: 0 4px 14px rgba(157, 78, 221, 0.4);
}

.edu-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.edu-text strong {
  font-family: 'Outfit', sans-serif;
  font-size: 12.5px;
  color: #fff;
  letter-spacing: 0.3px;
}

.edu-text span {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 2px;
}

@media (max-width: 900px) {
  .edu-badge {
    left: -20px;
    bottom: -10px;
    transform: scale(0.95);
  }
}

@media (max-width: 480px) {
  .edu-badge {
    left: -15px;
    bottom: -15px;
    transform: scale(0.85);
  }
}
`;
  css += cssToAdd;
  fs.writeFileSync('style.css', css, 'utf-8');
  console.log('Added edu-badge CSS to style.css');
} else {
  console.log('edu-badge CSS already exists.');
}
