const fs = require('fs');

let js = fs.readFileSync('script.js', 'utf-8');

const particleCanvasRegex = /\/\* ── 3\. PARTICLE CANVAS ────────────────────────────── \*\/\n\(function\(\)\{\n[\s\S]*?\n\}\)\(\);/m;

const threeJsCode = `/* ── 3. THREE.JS 3D BACKGROUND ────────────────────────────── */
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
    new THREE.MeshStandardMaterial({ color: 0x9d4edd, wireframe: true }),
    new THREE.MeshStandardMaterial({ color: 0x00f5d4, wireframe: true }),
    new THREE.MeshStandardMaterial({ color: 0xff006e, transparent: true, opacity: 0.7, roughness: 0.1, metalness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0xfcb045, wireframe: true })
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
`;

js = js.replace(particleCanvasRegex, threeJsCode);
fs.writeFileSync('script.js', js, 'utf-8');
console.log('script.js updated successfully!');
