// ═══════════════════════════════════════════════════════
// THEME & UMBREON TOGGLE
// ═══════════════════════════════════════════════════════
let isGold = false;
const themeWrap = document.getElementById('theme-wrap');
const themeBtn = document.getElementById('theme-btn');
const umbreonImg = document.getElementById('umbreon-img');

function toggleTheme() {
  isGold = !isGold;
  document.documentElement.classList.toggle('gold-mode', isGold);
  themeBtn.textContent = isGold ? '◉ MOONLIGHT MODE' : '◉ UMBREON MODE';
  
  if (isGold) {
    // Normal Umbreon (Gold mode)
    umbreonImg.src = 'assets/images/Umbreon_8bits.webp';
    umbreonImg.classList.remove('shiny-padding-fix');
  } else {
    // Shiny Umbreon (Cyan mode)
    umbreonImg.src = 'assets/images/umbreon8bit_shiny-Picsart-BackgroundRemover.png';
    umbreonImg.classList.add('shiny-padding-fix');
  }
}

themeBtn.addEventListener('click', toggleTheme);
umbreonImg.addEventListener('click', toggleTheme);

// ═══════════════════════════════════════════════════════
// POKEMON SPRITE ANIMATION
// ═══════════════════════════════════════════════════════
const SPRITE_SHEETS = [
  { name: 'FUECOCO', level: '??', src: 'assets/images/fuecoco sprite.png' },
  { name: 'CROCALOR', level: '36', src: 'assets/images/crocolar_movements.png' },
  { name: 'SKELEDIRGE', level: '58', src: 'assets/images/skeledirge_sprite.png' }
];
let evoStage = 0;
let pkmFrame = 0;
const pkmSpriteEl = document.getElementById('main-sprite');

function updatePokemon() {
  pkmSpriteEl.style.backgroundImage = `url('${SPRITE_SHEETS[evoStage].src}')`;
  updateEvoLabel();
}
updatePokemon();

function updateEvoLabel() {
  document.getElementById('evo-stage-label').textContent = SPRITE_SHEETS[evoStage].name + ' Lv.' + SPRITE_SHEETS[evoStage].level;
}

setInterval(() => {
  pkmFrame = (pkmFrame + 1) % 2;
  const xPos = pkmFrame === 0 ? '0%' : '33.333%';
  pkmSpriteEl.style.backgroundPosition = `${xPos} 0%`;
}, 500);

// ── TYPEWRITER BIO ──
const BIOS = [
  'Software Engineer specializing in cybersecurity automation & full-stack development.',
  'Veteran of classified DoD network ops. Fluent in Python, C#, and 日本語.',
  'Spent 3 years in Tokyo. Now slaying vulnerabilities in Colorado.',
  'Achievement unlocked: Cash Award 2023. TOAR Recognition 2024.',
];
let bIdx=0, cIdx=0, del=false;
const bioEl = document.getElementById('bio-text');
function typeLoop() {
  const cur = BIOS[bIdx];
  const shown = del ? cur.slice(0,cIdx-1) : cur.slice(0,cIdx+1);
  bioEl.innerHTML = shown + '<span class="cur"></span>';
  if(!del) {
    cIdx++;
    if(cIdx > cur.length) { del=true; setTimeout(typeLoop,2000); return; }
  } else {
    cIdx--;
    if(cIdx < 0) { del=false; bIdx=(bIdx+1)%BIOS.length; cIdx=0; setTimeout(typeLoop,250); return; }
  }
  setTimeout(typeLoop, del?24:44);
}
setTimeout(typeLoop, 900);

// ── HP BAR ──
function showHpBar() {
  document.getElementById('hp-bar-wrap').classList.add('show');
  setTimeout(() => {
    document.getElementById('hp-fill').style.width = Math.floor(65 + Math.random()*35) + '%';
  }, 100);
}
function hideHpBar() {
  document.getElementById('hp-bar-wrap').classList.remove('show');
  setTimeout(() => document.getElementById('hp-fill').style.width='100%', 400);
}

// ═══════════════════════════════════════════════════════
// SIF INTERACTION
// ═══════════════════════════════════════════════════════
let sifClicked = false;
document.getElementById('sif-companion').addEventListener('click', () => {
  if (sifClicked) return;
  sifClicked = true;
  
  const speech = document.getElementById('sif-speech');
  speech.textContent = "Artorias walks with you, Unkindled. Carry his legacy...";
  speech.style.opacity = '1';
  speech.style.transform = 'translateY(0)';

  setTimeout(() => {
    const sc = document.getElementById('sif-companion');
    sc.style.opacity = '0';
    sc.style.transform = 'translateX(80px)';
    sc.style.pointerEvents = 'none';
    
    setTimeout(() => sc.style.display = 'none', 800);
  }, 4500);
});

// ═══════════════════════════════════════════════════════
// PIXEL ART — BONFIRE
// ═══════════════════════════════════════════════════════
function drawBonfire(canvas, frame, lit, scale) {
  const ctx = canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  ctx.clearRect(0,0,W,H);
  const S = scale||4;
  
  function px(x,y,col) { ctx.fillStyle=col; ctx.fillRect(x*S,y*S,S,S); }
  
  const stone='#6a7a8a', dkstone='#3a4a5a', ltstone='#8a9aaa';
  const wood='#5a3820', dkwood='#3a2010';
  const f1='#ff6b00', f2='#ff9500', f3='#ffcc00', f4='#fff0a0';
  
  for(let x=1;x<=12;x++) px(x,13,stone);
  for(let x=2;x<=11;x++) px(x,12,dkstone);
  px(1,12,dkstone); px(12,12,dkstone);
  px(2,11,stone); px(3,11,dkstone); px(10,11,stone); px(11,11,dkstone);
  px(4,11,ltstone); px(9,11,ltstone);
  
  for(let i=0;i<5;i++) { px(3+i,11-i,wood); px(4+i,11-i,dkwood); }
  for(let i=0;i<5;i++) { px(11-i,11-i,wood); px(10-i,11-i,dkwood); }
  
  if(lit) {
    const flicker = frame%2;
    px(5,9,f1); px(6,9,f1); px(7,9,f1); px(8,9,f1);
    px(4,8,f1); px(5,8,f2); px(6,8,f2); px(7,8,f2); px(8,8,f1); px(9,8,f1);
    px(5,7,f2); px(6,7,f3); px(7,7,f3); px(8,7,f2);
    px(6,6,f3); px(7,6,f3);
    if(flicker) {
      px(5,6,f2); px(8,6,f2); px(6,5,f3); px(7,5,f4);
      px(4,7,f1); px(9,7,f1);
    } else {
      px(6,5,f2); px(7,5,f3); px(5,5,f1);
      px(8,5,f2); px(9,6,f1);
    }
    const em = frame%4;
    if(em===0){ px(3,7,'#ff4400'); px(10,8,'#ff6600'); }
    if(em===1){ px(4,6,'#ff3300'); px(9,5,'#ffaa00'); }
    if(em===2){ px(2,8,'#ff4400'); px(11,6,'#ff6600'); }
    if(em===3){ px(3,5,'#ff5500'); px(10,7,'#ffcc00'); }
    ctx.fillStyle='rgba(255,120,0,0.12)';
    ctx.fillRect(0,H-24,W,24);
  } else {
    px(5,10,'#2a2a2a'); px(6,10,'#3a3a3a'); px(7,10,'#2a2a2a');
    px(6,9,'#3a3a3a');
  }
}

let bonfireFrame=0, bonfireLit=false;
const bfCanvas = document.getElementById('bonfire-canvas');
drawBonfire(bfCanvas, 0, false);
setInterval(()=>{
  bonfireFrame++;
  drawBonfire(bfCanvas, bonfireFrame, bonfireLit);
}, 180);

const bfBig = document.getElementById('bonfire-big');
function updateBigBonfire() {
  drawBonfire(bfBig, bonfireFrame, true, 8);
}

function lightBonfire() {
  if(bonfireLit) return;
  bonfireLit = true;
  document.getElementById('bonfire-label').textContent = '[ BONFIRE LIT ]';
  
  setTimeout(()=>{
    document.getElementById('death-overlay').classList.add('active');
    updateBigBonfire();
    setInterval(updateBigBonfire, 180);

    const bw = document.getElementById('bonfire-wrap');
    bw.style.opacity = '0';
    bw.style.transform = 'translateY(20px)';
    bw.style.pointerEvents = 'none';
    setTimeout(() => bw.style.display = 'none', 600);

  }, 600);
}

function closeOverlay() {
  document.getElementById('death-overlay').classList.remove('active');
}
document.addEventListener('keydown', e=>{
  if(document.getElementById('death-overlay').classList.contains('active')) closeOverlay();
});
document.getElementById('death-overlay').addEventListener('click', e=>{
  if(e.target===document.getElementById('death-overlay')) closeOverlay();
});

// ═══════════════════════════════════════════════════════
// KONAMI CODE — EVOLVE FUECOCO
// ═══════════════════════════════════════════════════════
const KONAMI=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki=0;
document.addEventListener('keydown', e=>{
  if(e.key===KONAMI[ki]) {
    ki++;
    if(ki===KONAMI.length) { ki=0; triggerEvolve(); }
  } else ki=0;
});

function triggerEvolve() {
  evoStage = (evoStage + 1) % SPRITE_SHEETS.length;
  updatePokemon();
  
  const flash = document.getElementById('konami-flash');
  flash.classList.remove('burst');
  void flash.offsetWidth;
  flash.classList.add('burst');
  
  const popup = document.getElementById('evo-popup');
  const evoImg = document.getElementById('evo-sprite');
  evoImg.style.backgroundImage = `url('${SPRITE_SHEETS[evoStage].src}')`;
  document.getElementById('evo-label').textContent = SPRITE_SHEETS[evoStage].name + ' — Lv.' + SPRITE_SHEETS[evoStage].level;
  
  popup.classList.remove('active');
  void popup.offsetWidth;
  popup.classList.add('active');
  
  // Sync the theme swap with evolution
  toggleTheme();
  
  console.log('%c★ ' + SPRITE_SHEETS[evoStage].name + ' APPEARED! ★', 'color:#f5c842;font-family:monospace;font-size:14px;font-weight:bold;');
}

// ── CONSOLE LORE ──
console.log('%cArtorias\'s legacy lives on. Welcome, Unkindled One.','color:#00d4ff;font-family:monospace;font-size:14px;');
console.log('%c↑↑↓↓←→←→BA to evolve Fuecoco','color:#5a7080;font-family:monospace;font-size:11px;');

// ── SECRET CORNER ──
document.getElementById('secret-corner').addEventListener('click', ()=>{
  evoStage = 2; updateEvoLabel(); triggerEvolve();
});
