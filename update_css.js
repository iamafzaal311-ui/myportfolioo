const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// 1. Replace fonts
css = css.replace(/'Nunito'/g, "'Plus Jakarta Sans'");
css = css.replace(/'Sora'/g, "'Outfit'");

// 2. Update Dark Theme Variables for "Midnight Neon" vibe
css = css.replace(/--bg:    hsl\(230, 28%, 7%\);/, '--bg:    #050505;');
css = css.replace(/--bg1:   hsl\(230, 24%, 11%\);/, '--bg1:   rgba(15, 15, 18, 0.65);');
css = css.replace(/--bg2:   hsl\(230, 20%, 16%\);/, '--bg2:   rgba(25, 25, 30, 0.6);');
css = css.replace(/--bg3:   hsl\(230, 18%, 21%\);/, '--bg3:   rgba(35, 35, 42, 0.6);');
css = css.replace(/--bdr:   hsl\(230, 20%, 20%\);/, '--bdr:   rgba(255, 255, 255, 0.08);');
css = css.replace(/--bdr2:  hsl\(230, 16%, 28%\);/, '--bdr2:  rgba(255, 255, 255, 0.12);');

// Make layout translucent to show canvas behind
css = css.replace(/\.main-viewport \{\n  background: var\(--bg\);\n/g, '.main-viewport {\n  background: transparent;\n');

// 3. Add animated gradient text keyframes
const gtextAnim = `
.gtext {
  background: linear-gradient(135deg, var(--p), var(--p2), var(--rose), var(--p));
  background-size: 300% 300%;
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text;
  animation: gradientText 6s ease infinite;
}

@keyframes gradientText {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

css = css.replace(/\.gtext \{\n[^\}]+}/, gtextAnim);

fs.writeFileSync('style.css', css, 'utf-8');
console.log('CSS updated successfully!');
