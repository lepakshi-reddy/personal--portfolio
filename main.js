let dark = true;
function toggleTheme() {
  dark = !dark;
  document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
  const icon = dark ? '🌙' : '☀️';
  document.querySelectorAll('.theme-btn').forEach(b => b.textContent = icon);
}

// MOBILE MENU
function toggleMenu() { document.getElementById('mobileNav').classList.toggle('open'); }
function closeMobile() { document.getElementById('mobileNav').classList.remove('open'); }

// TYPED EFFECT
const phrases = ['Aspiring Data Scientist', 'B.Tech DS Student', 'ML Enthusiast', 'Web Developer', 'Problem Solver'];
let pi = 0, ci = 0, del = false;
function typeLoop() {
  const el = document.getElementById('typed');
  const cur = phrases[pi];
  if (!del) {
    el.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { del = true; setTimeout(typeLoop, 1800); return; }
  } else {
    el.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeLoop, del ? 60 : 100);
}
typeLoop();

// PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let pts = [];
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize(); window.addEventListener('resize', resize);
for (let i = 0; i < 60; i++) pts.push({ x: Math.random()*innerWidth, y: Math.random()*innerHeight, vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4, r: Math.random()*2+1 });
function drawParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#3b82f6';
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
  });
  // lines
  for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
    const d = Math.hypot(pts[i].x-pts[j].x, pts[i].y-pts[j].y);
    if (d < 120) { ctx.strokeStyle = `rgba(59,130,246,${(1-d/120)*.3})`; ctx.lineWidth=0.5; ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// REVEAL ON SCROLL
const revEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
revEls.forEach(el => obs.observe(el));

// CONTRIBUTION GRID
const grid = document.getElementById('contribGrid');
const lvls = [0,0,0,0,1,1,1,2,2,3,4];
const totalDays = 52 * 7;
for (let i = 0; i < totalDays; i++) {
  const c = document.createElement('div');
  const l = lvls[Math.floor(Math.random()*lvls.length)];
  c.className = 'contrib-cell' + (l ? ' l'+l : '');
  c.title = `Level ${l} activity`;
  grid.appendChild(c);
}

// CONTACT FORM - Formspree Integration
// Setup: Go to https://formspree.io, create account, set up form with your email
// Replace 'YOUR_FORM_ID' below with your actual Formspree endpoint (e.g., https://formspree.io/f/YOUR_FORM_ID)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdenwgq';

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        document.getElementById('formArea').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        document.getElementById('formError').style.display = 'none';
        contactForm.reset();
      } else {
        document.getElementById('formError').textContent = 'There was a problem sending your message. Please try again.';
        document.getElementById('formError').style.display = 'block';
      }
    } catch (error) {
      document.getElementById('formError').textContent = 'Error sending message. Please try again or contact directly.';
      document.getElementById('formError').style.display = 'block';
      console.error('Form submission error:', error);
    }
  });
}

