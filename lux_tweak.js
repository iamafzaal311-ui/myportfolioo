const fs = require('fs');

// --- 1. INDEX.HTML: Testimonials Update ---
let html = fs.readFileSync('index.html', 'utf-8');

// The replacement HTML for Testimonials
const newTestimonials = `<!-- Testimonials -->
          <h3 class="sub-title reveal" style="margin-top:48px">Client Testimonials</h3>
          <p class="body-text reveal" style="margin-bottom:20px">Trusted by companies for high-quality, scalable mobile solutions.</p>
          <div class="test-grid">
            <div class="test-card reveal">
              <div class="test-stars" style="color:var(--gold)">★★★★★ <span style="font-size:12px;color:var(--txm)">4.9</span></div>
              <p class="test-text">"Muhammad delivered highly scalable and optimized projects for us. His ability to work with complex technical ideas and implement solid business logic is truly outstanding."</p>
              <div class="test-foot">
                <div class="test-av"><i class="fa-solid fa-building"></i></div>
                <div><div class="test-name">Eyetee Valley Lahore</div><div class="test-role">Software Agency</div></div>
              </div>
            </div>
            <div class="test-card reveal">
              <div class="test-stars" style="color:var(--gold)">★★★★☆ <span style="font-size:12px;color:var(--txm)">4.5</span></div>
              <p class="test-text">"Excellent frontend work during his internship. He successfully created the complete frontend for our electronics e-commerce app 'Bazar 24' with high luxurious UI/UX."</p>
              <div class="test-foot">
                <div class="test-av"><i class="fa-solid fa-code"></i></div>
                <div><div class="test-name">Codefying Company</div><div class="test-role">Internship</div></div>
              </div>
            </div>
          </div>`;

// Regex to capture the old Testimonials block and replace it
const testRegex = /<!-- Testimonials -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
if (html.match(testRegex)) {
  html = html.replace(testRegex, newTestimonials);
  fs.writeFileSync('index.html', html, 'utf-8');
  console.log('Updated testimonials in index.html');
} else {
  // If regex failed (due to formatting), let's just append or assume it's updated.
  console.log('Could not match Testimonials block. Please check formatting.');
}

// --- 2. SCRIPT.JS: Sidebar Auto-Hide Logic ---
let js = fs.readFileSync('script.js', 'utf-8');
if (!js.includes('SIDEBAR AUTO-HIDE')) {
  const sbLogic = `
/* ── SIDEBAR AUTO-HIDE ────────────────────────────── */
(function(){
  let idleTimer;
  function resetIdle() {
    document.body.classList.remove('sb-idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      document.body.classList.add('sb-idle');
    }, 1200); // 1.2s delay for auto-hide
  }
  window.addEventListener('mousemove', resetIdle);
  window.addEventListener('scroll', resetIdle, true);
  window.addEventListener('touchstart', resetIdle);
  window.addEventListener('click', resetIdle);
  resetIdle();
})();
`;
  js += sbLogic;
  fs.writeFileSync('script.js', js, 'utf-8');
  console.log('Added auto-hide logic to script.js');
}

// --- 3. STYLE.CSS: CSS for Auto-Hide & Luxurious Aesthetics ---
let css = fs.readFileSync('style.css', 'utf-8');
if (!css.includes('sb-idle')) {
  const luxCss = `
/* ── AUTO-HIDE SIDEBAR EFFECT ───────────────────────── */
.sidebar {
  transition: margin-left 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s var(--ease), opacity 0.8s ease;
}
@media (min-width: 901px) {
  body.sb-idle .sidebar {
    margin-left: -260px;
    opacity: 0;
    pointer-events: none;
  }
  .main-viewport {
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1), flex 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

@media (max-width: 900px) {
  body.sb-idle .app-bar {
    transform: translateY(-100%);
    opacity: 0;
  }
  .app-bar {
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
  }
}

/* ── HIGH LUXURIOUS CLASS AESTHETICS ────────────────── */
:root {
  --gold: #e6c15c; /* Refined Champagne Gold */
  --gold-dim: rgba(230, 193, 92, 0.12);
}
.proj-card:hover {
  box-shadow: 0 10px 40px rgba(230, 193, 92, 0.08), inset 0 1px 0 rgba(255,255,255,0.15);
  border-color: rgba(230, 193, 92, 0.3);
}
.hero-h1 {
  text-shadow: 0 4px 40px rgba(157, 78, 221, 0.3);
}
.btn-p {
  box-shadow: 0 4px 20px var(--p-glow), inset 0 1px 0 rgba(255,255,255,0.2);
}
`;
  css += luxCss;
  fs.writeFileSync('style.css', css, 'utf-8');
  console.log('Added auto-hide and luxurious CSS to style.css');
}
