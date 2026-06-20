/* ═══════════════════════════════════════════════════
   Muhammad Afzaal Portfolio v4 — Script
   ═══════════════════════════════════════════════════ */

/* ── 1. THEME ─────────────────────────────────────── */
function toggleTheme(){
  const h=document.documentElement,next=h.getAttribute('data-theme')==='dark'?'light':'dark';
  h.setAttribute('data-theme',next);localStorage.setItem('theme',next);
}

/* ── 2. CUSTOM CURSOR ─────────────────────────────── */
(function(){
  const c=document.getElementById('cursor'),d=document.getElementById('cursorDot');
  if(!c||!d||window.matchMedia('(hover:none)').matches)return;
  let mx=0,my=0,cx=0,cy=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;d.style.left=mx+'px';d.style.top=my+'px';});
  function anim(){cx+=(mx-cx)*.15;cy+=(my-cy)*.15;c.style.left=cx+'px';c.style.top=cy+'px';requestAnimationFrame(anim);}
  anim();
  document.addEventListener('mousedown',()=>c.style.transform='translate(-50%,-50%) scale(.7)');
  document.addEventListener('mouseup',()=>c.style.transform='translate(-50%,-50%) scale(1)');
  document.querySelectorAll('button,a,.proj-card,.feat-card,.cc').forEach(el=>{
    el.addEventListener('mouseenter',()=>c.style.transform='translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave',()=>c.style.transform='translate(-50%,-50%) scale(1)');
  });
})();

/* ── 3. THREE.JS 3D BACKGROUND ────────────────────────────── */
(function(){
  const cv = document.getElementById('bgCanvas');
  if(!cv || typeof THREE === 'undefined') return;
  
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.0015);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x9d4edd, 2, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);
  const pointLight2 = new THREE.PointLight(0x00f5d4, 2, 100);
  pointLight2.position.set(-10, -10, 10);
  scene.add(pointLight2);

  // Objects
  const objects = [];
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.TorusGeometry(1, 0.3, 16, 32),
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.OctahedronGeometry(1.2, 0)
  ];
  
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x9d4edd, wireframe: true, transparent: true, opacity: 0.15 }),
    new THREE.MeshStandardMaterial({ color: 0x00f5d4, wireframe: true, transparent: true, opacity: 0.15 }),
    new THREE.MeshStandardMaterial({ color: 0xff006e, transparent: true, opacity: 0.15, roughness: 0.1, metalness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0xfcb045, wireframe: true, transparent: true, opacity: 0.15 })
  ];

  for(let i=0; i<50; i++) {
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(geo, mat);
    
    mesh.position.x = (Math.random() - 0.5) * 60;
    mesh.position.y = (Math.random() - 0.5) * 60 + 20;
    mesh.position.z = (Math.random() - 0.5) * 40 - 10;
    
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.02,
      ry: (Math.random() - 0.5) * 0.02,
      vy: Math.random() * 0.06 + 0.02
    };
    
    scene.add(mesh);
    objects.push(mesh);
  }

  function animate() {
    requestAnimationFrame(animate);
    
    objects.forEach(obj => {
      obj.rotation.x += obj.userData.rx;
      obj.rotation.y += obj.userData.ry;
      obj.position.y -= obj.userData.vy;
      
      // Reset if it falls too low
      if (obj.position.y < -30) {
        obj.position.y = 30;
        obj.position.x = (Math.random() - 0.5) * 60;
      }
    });
    
    renderer.render(scene, camera);
  }
  
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/* ── X. CHANGING FONTS AND COLORS (HERO TEXT) ────────────────────────────── */
(function(){
  const h1 = document.querySelector('.hero-h1 .gtext');
  if(!h1) return;
  const fonts = ['Outfit', 'Space Mono', 'Plus Jakarta Sans', 'Courier New', 'Impact'];
  let fontIdx = 0;
  
  setInterval(() => {
    fontIdx = (fontIdx + 1) % fonts.length;
    h1.style.fontFamily = fonts[fontIdx];
    h1.style.transition = 'font-family 0.3s ease';
  }, 2500); 
})();


/* ── 4. TYPEWRITER ─────────────────────────────────── */
(function(){
  const el=document.getElementById('typeSpan');if(!el)return;
  const words=['Flutter Developer','Mobile App Specialist','Dart Programmer','UI/UX Enthusiast','Freelance Developer','BS IT Student'];
  let wi=0,ci=0,del=false;
  function tick(){
    const w=words[wi];
    el.textContent=del?w.substring(0,--ci):w.substring(0,++ci);
    if(!del&&ci===w.length){del=true;setTimeout(tick,1700);return;}
    if(del&&ci===0){del=false;wi=(wi+1)%words.length;}
    setTimeout(tick,del?50:85);
  }tick();
})();

/* ── 5. INTERSECTION OBSERVER (scroll reveal for ALL sections) ── */
(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const siblings = Array.from(e.target.parentElement.children)
        .filter(c => c.className === e.target.className);
      const idx = Math.max(0, siblings.indexOf(e.target));
      setTimeout(() => {
        e.target.classList.add('visible');
        // Animate skill fills when they enter view
        e.target.querySelectorAll('.sk-fill').forEach(b => {
          b.style.width = (b.dataset.w || 0) + '%';
        });
        // Also trigger if the element itself is a skill fill parent
        if (e.target.classList.contains('skill')) {
          e.target.querySelectorAll('.sk-fill').forEach(b => {
            b.style.width = (b.dataset.w || 0) + '%';
          });
        }
      }, idx * 85);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });

  // Observe after DOM ready — covers all sections since they're all rendered
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));
  });
})();

/* ── 6. STATS COUNTER — handled in DOMContentLoaded ── */

/* ── 7. NAVIGATION — scrollable sections ────────── */
function scrollToSection(id, btn) {
  const sec = document.getElementById(id);
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setActiveNav(id);
  closeSidebar();
  // resources lazy render
  if (id === 'articles') renderResources();
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-btn').forEach(b => {
    const onclick = b.getAttribute('onclick') || '';
    b.classList.toggle('active', onclick.includes("'" + id + "'"));
  });
}

// Auto-highlight nav as user scrolls through sections
(function initScrollSpy() {
  const sectionIds = ['home', 'about', 'projects', 'articles', 'contact'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) setActiveNav(e.target.id);
    });
  }, { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' });

  document.addEventListener('DOMContentLoaded', () => {
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  });

  // Scroll Progress Bar
  const mainViewport = document.querySelector('.main-viewport');
  const scrollBar = document.getElementById('scroll-progress');
  if (mainViewport && scrollBar) {
    mainViewport.addEventListener('scroll', () => {
      const scrollTotal = mainViewport.scrollHeight - mainViewport.clientHeight;
      if (scrollTotal > 0) {
        const scrolled = (mainViewport.scrollTop / scrollTotal) * 100;
        scrollBar.style.width = scrolled + '%';
      }
    });
  }
})();

// Keep showPage as alias for backward compatibility with any inline calls
function showPage(id, btn) { scrollToSection(id, btn); }

function toggleSidebar() {
  const sb = document.getElementById('sidebar'), ov = document.getElementById('sbOverlay');
  if (!sb || !ov) return;
  const open = sb.classList.contains('open');
  sb.classList.toggle('open', !open);
  ov.classList.toggle('active', !open);
}
function closeSidebar() {
  const sb = document.getElementById('sidebar'), ov = document.getElementById('sbOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('active');
}

/* ── 8. PROJECT DATA ───────────────────────────────── */
const PD={
  zarr:{title:'Zarr Finance Tracker',tag:'Fintech',desc:'Premium personal finance app with expense/income tracking, visual graphs, category budgets, and secure offline data persistence.',features:['Daily Expense & Income Tracking','Visual Bar & Pie Charts','Category Budget System','Data Export & Backup','Dark/Light Theme Support'],github:'https://github.com/iamafzaal311-ui/zarr_smart_fin_manager',ps:'',video:'https://www.youtube-nocookie.com/embed/zWJgJFH6ogE?rel=0',snaps:['assets/zarr/z1.jpeg','assets/zarr/z2.jpeg','assets/zarr/z9.jpeg','assets/zarr/z3.jpeg','assets/zarr/z4.jpeg','assets/zarr/z5.jpeg','assets/zarr/z6.jpeg','assets/zarr/z7.jpeg','assets/zarr/z8.jpeg']},
  vemta:{title:'Vemta AI',tag:'AI / Utility',desc:'OCR-powered report analyzer that converts images and documents into editable digital text using AI. Built for professionals needing quick text extraction.',features:['High-Accuracy OCR Engine','AI Report Summarization','Batch Image Processing','Export to PDF / TXT','Clean Minimal UI'],github:'https://github.com/iamafzaal311-ui/vemta-ai',ps:'',video:'https://www.youtube-nocookie.com/embed/SCE-QeDfBZQ?rel=0',snaps:['assets/vem/v1.jpeg','assets/vem/v2.jpeg','assets/vem/v3.jpeg','assets/vem/v4.jpeg','assets/vem/v5.jpeg','assets/vem/v6.jpeg']},
  repflex:{title:'Repflex Gym Workout',tag:'Fitness',desc:'Comprehensive gym tracker with personalized workout plans, exercise video library, reps/sets counter and weekly progress analytics.',features:['Personalized Workout Plans','Exercise Video Library','Reps / Sets / Weight Log','Progress Charts & Streaks','Rest Timer with Alerts'],github:'https://github.com/iamafzaal311-ui/repflex-gym',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/rep/r1.jpeg','assets/rep/r2.jpeg','assets/rep/r3.jpeg','assets/rep/r4.jpeg','assets/rep/r5.jpeg','assets/rep/r6.jpeg','assets/rep/r7.jpeg','assets/rep/r8.jpeg','assets/rep/r9.jpeg','assets/rep/r10.jpeg']},
  qr:{title:'QR Code Reader & Generator',tag:'Utility',desc:'Versatile QR app — scan any QR code live and generate custom QR codes with logo embedding, color branding and history tracking.',features:['Live QR Scanning','Custom QR Generation','Logo & Color Branding','Scan History','Share & Save Options'],github:'https://github.com/iamafzaal311-ui/qr-code-app',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/qr/q1.jpeg','assets/qr/q2.jpeg','assets/qr/q3.jpeg','assets/qr/q4.jpeg','assets/qr/q5.jpeg']},
  imgpdf:{title:'Image to PDF Converter',tag:'Utility',desc:'Convert multiple images into a professional PDF with page orientation, quality settings and batch processing. Fast and lightweight.',features:['Batch Image Selection','Page Layout Options','Quality & Size Control','Reorder Before Export','Cloud Share Support'],github:'https://github.com/iamafzaal311-ui/image-pdf-converter',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z1.jpeg','assets/zarr/z2.jpeg','assets/zarr/z3.jpeg']},
  agewise:{title:'Agewise Age Calculator',tag:'Utility',desc:'Calculate exact age in years, months, days, hours, minutes. Birthday countdowns, milestone alerts and date difference calculator.',features:['Exact Age Breakdown','Milestone Birthday Alerts','Date Difference Calculator','Multiple Format Support','Countdown Timer'],github:'https://github.com/iamafzaal311-ui/agewise-calculator',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/age/a1.jpeg','assets/age/a2.jpeg','assets/age/a3.jpeg','assets/age/a4.jpeg','assets/age/a5.jpeg','assets/age/a6.jpeg','assets/age/a7.jpeg','assets/age/a8.jpeg']},
  mehndi:{title:'Mehndi & Nail Walltrix',tag:'Design',desc:'HD gallery app for mehndi and nail art. Browse thousands of designs, set wallpapers, download in HD and share with friends.',features:['HD Gallery Collections','Mehndi & Nail Categories','Wallpaper Setter','HD Download & Share','Daily New Designs'],github:'https://github.com/iamafzaal311-ui/mehndi-nail-designs',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/wlp/w1.jpeg','assets/wlp/w2.jpeg','assets/wlp/w3.jpeg']},
  decision:{title:'Decision Doom Wheel',tag:'Entertainment',desc:'Fun interactive fortune wheel for making random decisions. Add custom options, spin with satisfying animation and sound, save results.',features:['Custom Option Input','Smooth Spin Animation','Sound FX & Vibration','Result History Log','Multiple Wheel Themes'],github:'https://github.com/iamafzaal311-ui/decision-wheel',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z4.jpeg','assets/zarr/z5.jpeg','assets/zarr/z6.jpeg']},
  tareek:{title:'Tareek – Bikrami Calendar',tag:'Utility',desc:'Traditional Bikrami calendar with Gregorian conversion, Punjab cultural events, festival reminders and monthly/yearly views.',features:['Bikrami–Gregorian Conversion','Cultural Holidays','Festival Reminders','Monthly & Yearly View','Offline Support'],github:'https://github.com/iamafzaal311-ui/tareek-calendar',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z7.jpeg','assets/zarr/z8.jpeg','assets/zarr/z9.jpeg']},
  studymesh:{title:'StudyMesh',tag:'Education',desc:'Peer-to-peer study group finder for university students. Create and join groups, real-time Firebase chat, resource sharing and event management.',features:['Group Creation & Search','Real-time Firebase Chat','Resource File Sharing','Firebase Authentication','Event Scheduling'],github:'https://github.com/iamafzaal311-ui/studymesh',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z1.jpeg','assets/zarr/z2.jpeg','assets/zarr/z3.jpeg']},
  agri:{title:'Punjab Agri-Guide',tag:'Agriculture',desc:'Farming guidance app for Punjab region with city-specific crop data for maize, rice, wheat, and more. Seasonal advice and local language support.',features:['City-Specific Crop Data','Seasonal Guidance','Local Language Support','Irrigation Calendar','Pest Management Tips'],github:'https://github.com/iamafzaal311-ui/agri-guide',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z4.jpeg','assets/zarr/z5.jpeg','assets/zarr/z6.jpeg']},
  newsapp:{title:'Daily Pulse – News App',tag:'News',desc:'Real-time news aggregator with category filters, bookmarks and offline reading. Clean card-based UI with smooth pagination.',features:['Live News API Feed','Category Filters','Bookmark Articles','Offline Reading Mode','Dark/Light Theme'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z7.jpeg','assets/zarr/z8.jpeg','assets/zarr/z9.jpeg']},
  weather:{title:'SkyLens Weather',tag:'Weather',desc:'Beautiful weather app with animated sky backgrounds, hourly and 7-day forecasts, UV index, humidity and wind speed data.',features:['Animated Weather Backgrounds','Hourly & 7-Day Forecast','UV & Air Quality Index','Location Auto-detect','Widget Support'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z1.jpeg','assets/zarr/z2.jpeg','assets/zarr/z3.jpeg']},
  chatapp:{title:'ChatSphere',tag:'Social',desc:'Real-time chat app with Firebase messaging, user profiles, online status, media sharing and group conversations.',features:['Real-time Firebase Messaging','User Profiles & Status','Image & File Sharing','Group Chats','Read Receipts'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z4.jpeg','assets/zarr/z5.jpeg','assets/zarr/z6.jpeg']},
  todo:{title:'TaskFlow – Todo Manager',tag:'Productivity',desc:'Smart task manager with priority levels, due dates, recurring tasks, reminders and weekly productivity analytics.',features:['Priority Levels','Due Dates & Reminders','Recurring Tasks','Weekly Stats','Cloud Sync'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z7.jpeg','assets/zarr/z8.jpeg','assets/zarr/z9.jpeg']},
  ecom:{title:'ShopNest – Store App',tag:'E-Commerce',desc:'Full e-commerce UI with product catalogue, cart, wishlist, order tracking and Stripe payment gateway integration.',features:['Product Listings & Search','Cart & Wishlist','Stripe Payment','Order Tracking','Admin Panel'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z1.jpeg','assets/zarr/z2.jpeg','assets/zarr/z3.jpeg']},
  recipe:{title:'RecipeVault',tag:'Lifestyle',desc:'Cook book app with 500+ recipes, dietary filters, ingredient calculator, step-by-step mode and offline favourites.',features:['500+ Recipes','Dietary Filters','Ingredient Calculator','Step-by-Step Mode','Offline Favourites'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z4.jpeg','assets/zarr/z5.jpeg','assets/zarr/z6.jpeg']},
  medtrack:{title:'MedTrack – Medicine Reminder',tag:'Health',desc:'Medicine reminder app with daily schedules, dosage history, refill alerts and pharmacy notes for patients and caregivers.',features:['Daily Medicine Schedule','Dosage History Log','Refill & Stock Alerts','Pharmacy Notes','Multiple Profiles'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z7.jpeg','assets/zarr/z8.jpeg','assets/zarr/z9.jpeg']},
  mapnav:{title:'NearMe – Location Finder',tag:'Navigation',desc:'Nearby places finder using Google Maps. Filter by category, get directions, read reviews and save favourite spots.',features:['Google Maps Integration','Category Filters','Turn-by-Turn Directions','Place Reviews','Saved Locations'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z1.jpeg','assets/zarr/z2.jpeg','assets/zarr/z3.jpeg']},
  flashcard:{title:'FlashLearn – Study Cards',tag:'Education',desc:'Flashcard study app using spaced repetition algorithm. Create decks, track mastery scores and test yourself in quiz mode.',features:['Spaced Repetition Algorithm','Custom Deck Creation','Quiz & Test Mode','Mastery Score Tracking','Import CSV Cards'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z4.jpeg','assets/zarr/z5.jpeg','assets/zarr/z6.jpeg']},
  passwordmgr:{title:'VaultPass – Password Manager',tag:'Security',desc:'Secure offline password manager with AES-256 encryption, biometric authentication, password generator and breach alerts.',features:['AES-256 Encryption','Biometric Lock','Strong Password Generator','Breach Detection','Secure Export / Import'],github:'https://github.com/iamafzaal311-ui',ps:'',video:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',snaps:['assets/zarr/z7.jpeg','assets/zarr/z8.jpeg','assets/zarr/z9.jpeg']}
};

/* ── 9. PROJECT OVERLAY ────────────────────────────── */
let curPid=null,curSnap=0,lastFocus=null;

function openProject(id){
  lastFocus=document.activeElement;
  curPid=id;curSnap=0;
  const d=PD[id];if(!d)return;
  document.getElementById('ovTitle').textContent=d.title;
  document.getElementById('ovTag').textContent=d.tag;
  document.getElementById('ovDesc').textContent=d.desc;
  document.getElementById('ovGithub').href=d.github;
  const ps=document.getElementById('ovPlaystore');
  ps.style.display=d.ps?'inline-flex':'none';
  if(d.ps)ps.href=d.ps;
  const ul=document.getElementById('ovFeatures');ul.innerHTML='';
  d.features.forEach(f=>{const li=document.createElement('li');li.textContent=f;ul.appendChild(li);});
  document.querySelectorAll('.po-tab').forEach(t=>t.classList.remove('active'));
  const firstTab=document.querySelector('.po-tab');if(firstTab)firstTab.classList.add('active');
  buildCarousel(d);
  const ov=document.getElementById('projOverlay');ov.classList.add('active');document.body.style.overflow='hidden';
  setTimeout(()=>{const cl=ov.querySelector('.po-close');if(cl)cl.focus();},120);
}

function closeProject(){
  const ov=document.getElementById('projOverlay');
  ov.classList.remove('active');
  clearMedia();
  setTimeout(()=>{document.body.style.overflow='';},300);
  if(lastFocus){lastFocus.focus();lastFocus=null;}
}

function switchTab(type,btn){
  document.querySelectorAll('.po-tab').forEach(t=>t.classList.remove('active'));
  if(btn)btn.classList.add('active');
  const d=PD[curPid];if(!d)return;
  if(type==='snaps'){curSnap=0;buildCarousel(d);}
  else buildVideo(d);
}

function buildCarousel(d){
  const el=document.getElementById('ovMedia');if(!el)return;
  el.innerHTML='';
  const fr=document.createElement('div');fr.className='slide-frame';
  const tr=document.createElement('div');tr.className='slide-track';
  d.snaps.forEach((s,i)=>{
    const it=document.createElement('div');it.className='slide-item';
    const img=document.createElement('img');img.src=s;img.alt=d.title+' '+(i+1);img.loading='lazy';
    img.onclick=()=>expandImage(s);it.appendChild(img);tr.appendChild(it);
  });
  const lb=mk('button','car-ctrl l','<i class="fa-solid fa-chevron-left"></i>');lb.setAttribute('aria-label','Prev');lb.onclick=()=>move(-1,d);
  const rb=mk('button','car-ctrl r','<i class="fa-solid fa-chevron-right"></i>');rb.setAttribute('aria-label','Next');rb.onclick=()=>move(1,d);
  const dots=mk('div','car-dots','');
  d.snaps.forEach((_,i)=>{const dot=mk('button','car-dot'+(i===0?' on':''),'');dot.setAttribute('aria-label','Snap '+(i+1));dot.onclick=()=>{curSnap=i;updateCar();};dots.appendChild(dot);});
  fr.appendChild(tr);fr.appendChild(lb);fr.appendChild(rb);fr.appendChild(dots);el.appendChild(fr);
  updateCar();
}
function buildVideo(d){
  const el=document.getElementById('ovMedia');if(!el)return;el.innerHTML='';
  const ifr=document.createElement('iframe');ifr.src=ytUrl(d.video);ifr.allow='accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture';ifr.allowFullscreen=true;ifr.loading='lazy';el.appendChild(ifr);
}
function move(dir,d){curSnap=Math.max(0,Math.min(d.snaps.length-1,curSnap+dir));updateCar();}
function updateCar(){
  const tr=document.querySelector('.slide-track');if(tr)tr.style.transform=`translateX(-${curSnap*100}%)`;
  document.querySelectorAll('.car-dot').forEach((d,i)=>d.classList.toggle('on',i===curSnap));
}
function clearMedia(){const el=document.getElementById('ovMedia');if(el)el.innerHTML='<i class="fa-solid fa-mobile-screen" style="font-size:38px;opacity:.25"></i>';}
function ytUrl(u){if(!u)return'';const m=u.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/i);return m?`https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&modestbranding=1`:u;}
function mk(tag,cls,html){const e=document.createElement(tag);e.className=cls;e.innerHTML=html;return e;}

/* ── 10. IMAGE EXPANDER ─────────────────────────────── */
function expandImage(src){
  const ex=document.getElementById('imgExpander'),img=document.getElementById('expanderImg');
  if(!ex||!img)return;img.src=src;ex.classList.add('active');document.body.style.overflow='hidden';
}
function closeExpander(){
  const ex=document.getElementById('imgExpander');if(ex)ex.classList.remove('active');document.body.style.overflow='';
}

/* ── 11. RESOURCES ─────────────────────────────────── */
const RESOURCES=[
  {name:'Flutter SDK',desc:'The leading UI toolkit for building natively compiled apps from a single Dart codebase.',lang:'GitHub',stars:170000,url:'https://github.com/flutter/flutter'},
  {name:'Awesome Flutter',desc:'Curated list of the best Flutter packages, tools and tutorials by the community.',lang:'GitHub',stars:52000,url:'https://github.com/Solido/awesome-flutter'},
  {name:'Provider',desc:'Lightweight, flexible state management wrapping InheritedWidget for clean Flutter apps.',lang:'Dart',stars:8600,url:'https://github.com/rrousselGit/provider'},
  {name:'Riverpod',desc:'A safe, testable, modern evolution of Provider with compile-time checks.',lang:'Dart',stars:8400,url:'https://github.com/rrousselGit/river_pod'},
  {name:'FlutterFire',desc:'Official Firebase plugins for Flutter — Auth, Firestore, Storage, Analytics.',lang:'GitHub',stars:13000,url:'https://github.com/firebase/flutterfire'},
  {name:'Supabase Flutter',desc:'Flutter SDK for Supabase — auth, database, storage and real-time in one.',lang:'Dart',stars:2100,url:'https://github.com/supabase/supabase-flutter'},
  {name:'Dio HTTP',desc:'Powerful HTTP client for Dart with interceptors, FormData and request cancellation.',lang:'Dart',stars:12200,url:'https://github.com/cfug/dio'},
  {name:'Get CLI / GetX',desc:'Complete state management, routing and dependency injection solution for Flutter.',lang:'Dart',stars:10000,url:'https://github.com/jonataslaw/getx'}
];
function renderResources(){
  const g=document.getElementById('resGrid');if(!g||g.children.length)return;
  RESOURCES.forEach((r,i)=>{
    const c=document.createElement('div');c.className='res-card reveal';
    c.style.transitionDelay=(i*70)+'ms';
    c.onclick=()=>window.open(r.url,'_blank','noopener');
    c.innerHTML=`<span class="res-badge">${r.lang}</span><h4>${r.name}</h4><p>${r.desc}</p><div class="res-stars">⭐ ${r.stars.toLocaleString()} stars</div>`;
    g.appendChild(c);requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.add('visible')));
  });
}

/* ── 12. CONTACT FORM ──────────────────────────────── */
function toggleForm(){
  const f=document.getElementById('emailForm');
  if(!f)return;
  const show=!f.classList.contains('showing');
  f.classList.toggle('showing',show);
  if(show){f.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>document.getElementById('fName').focus(),400);}
}
function sendEmail(e){
  e.preventDefault();
  const n=document.getElementById('fName').value.trim(),em=document.getElementById('fEmail').value.trim(),s=document.getElementById('fSubject').value.trim(),m=document.getElementById('fMessage').value.trim();
  if(!n||!em||!s||!m)return;
  window.location.href=`mailto:afzaal311@gmail.com?subject=${encodeURIComponent(s)}&body=${encodeURIComponent('Name: '+n+'\nEmail: '+em+'\n\n'+m)}`;
  e.target.reset();toggleForm();
}

/* ── 13. KEYBOARD & ESC ────────────────────────────── */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    const ov=document.getElementById('projOverlay');if(ov&&ov.classList.contains('active')){closeProject();return;}
    const ex=document.getElementById('imgExpander');if(ex&&ex.classList.contains('active'))closeExpander();
  }
});

/* ── 14. DOM READY ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Sidebar rainbow top bar
  document.querySelectorAll('.sidebar').forEach(sb => {
    if (!sb.querySelector('.sidebar-gradient-bar')) {
      const bar = document.createElement('div');
      bar.className = 'sidebar-gradient-bar';
      sb.prepend(bar);
    }
  });

  // Animate hero immediately
  setTimeout(() => {
    document.querySelectorAll('#home .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
  }, 80);

  // Stat counters (triggered by IntersectionObserver below too)
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const to = parseInt(el.dataset.to);
      if (isNaN(to)) return;
      let n = 0;
      const step = Math.ceil(to / 38);
      const t = setInterval(() => {
        n = Math.min(n + step, to);
        el.textContent = n + '+';
        if (n >= to) clearInterval(t);
      }, 45);
      statsObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-n[data-to]').forEach(el => statsObs.observe(el));

  // 3D tilt for service/featured cards
  document.querySelectorAll('.svc-card, .feat-card').forEach(addTilt);

  // Render resources now (section always visible)
  renderResources();
});

/* ── 15. 3D TILT ───────────────────────────────────── */
function addTilt(el) {
  if (window.matchMedia('(hover:none)').matches) return;
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-5px)`;
    el.style.boxShadow = `${-x*14}px ${y*10}px 36px rgba(0,0,0,.35)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.boxShadow = '';
  });
}

// Proj card tilt
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.proj-card').forEach(c => {
    if (window.matchMedia('(hover:none)').matches) return;
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      c.style.transform = `perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
});

/* ── SIDEBAR AUTO-HIDE ────────────────────────────── */
(function(){
  let idleTimer;
  function resetIdle() {
    document.body.classList.remove('sb-idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      document.body.classList.add('sb-idle');
    }, 3000); // Increased delay to 3 seconds so it doesn't hide too fast
  }
  window.addEventListener('mousemove', resetIdle);
  window.addEventListener('scroll', resetIdle, true);
  window.addEventListener('touchstart', resetIdle);
  window.addEventListener('click', resetIdle);
  
  // Explicitly bind to main-viewport for continuous scrolling
  const mv = document.querySelector('.main-viewport');
  if (mv) mv.addEventListener('scroll', resetIdle);
  
  resetIdle();
})();
