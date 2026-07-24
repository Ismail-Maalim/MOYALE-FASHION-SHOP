/* ==========================================================================
   HAPPY BIRTHDAY MIHNAZ - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initAudioPlayer();
  
  // Trigger initial celebration confetti after short delay
  setTimeout(() => {
    triggerConfettiExplosion();
  }, 600);
});

/* --------------------------------------------------------------------------
   1. Background Canvas Floating Particles & Hearts
   -------------------------------------------------------------------------- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  const particles = [];
  const particleCount = Math.min(Math.floor(width / 18), 45);
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.size = Math.random() * 4 + 2;
      this.speedY = Math.random() * 1.2 + 0.4;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.color = ['#ff6584', '#ffd166', '#c77dff', '#ff85a1', '#4cc9f0'][Math.floor(Math.random() * 5)];
      this.isHeart = Math.random() > 0.6;
    }
    
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      
      if (this.y < -20) {
        this.reset();
      }
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      
      if (this.isHeart) {
        // Draw Heart
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + this.size, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x, this.y + this.size, this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
        ctx.fill();
      } else {
        // Draw Glowing Bokeh Circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
      
      ctx.restore();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* --------------------------------------------------------------------------
   2. Confetti Explosion System (using canvas-confetti CDN)
   -------------------------------------------------------------------------- */
function triggerConfettiExplosion() {
  playChimeSFX();
  if (typeof confetti === 'function') {
    // Left side burst
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.75 },
      colors: ['#ff6584', '#ffd166', '#9d4edd', '#ffffff']
    });
    
    // Right side burst
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.75 },
      colors: ['#ff6584', '#ffd166', '#4cc9f0', '#ffffff']
    });
    
    // Center stream
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff758c', '#ffd166', '#c77dff', '#70e000']
      });
    }, 200);
  }
}

function sendVirtualHug() {
  playHeartSFX();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.7 },
      shapes: ['star', 'circle'],
      colors: ['#ff6584', '#ff85a1', '#ffffff']
    });
  }
  
  // Show notification feedback
  showToast("💖 Sent a warm virtual hug to Mihnaz!");
}

function showToast(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 101, 132, 0.95);
      color: #fff;
      padding: 12px 24px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.95rem;
      z-index: 2000;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      animation: popIn 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}

/* --------------------------------------------------------------------------
   3. Web Audio API Melody Synthesizer (Happy Birthday Tune)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let isMusicPlaying = false;
let sfxEnabled = true;
let melodyInterval = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

const birthdayNotes = [
  // Happy Birthday To You
  { note: 261.63, duration: 0.4 }, // C4
  { note: 261.63, duration: 0.2 }, // C4
  { note: 293.66, duration: 0.6 }, // D4
  { note: 261.63, duration: 0.6 }, // C4
  { note: 349.23, duration: 0.6 }, // F4
  { note: 329.63, duration: 1.0 }, // E4

  // Happy Birthday To You
  { note: 261.63, duration: 0.4 }, // C4
  { note: 261.63, duration: 0.2 }, // C4
  { note: 293.66, duration: 0.6 }, // D4
  { note: 261.63, duration: 0.6 }, // C4
  { note: 392.00, duration: 0.6 }, // G4
  { note: 349.23, duration: 1.0 }, // F4

  // Happy Birthday Dear Mihnaz
  { note: 261.63, duration: 0.4 }, // C4
  { note: 261.63, duration: 0.2 }, // C4
  { note: 523.25, duration: 0.6 }, // C5
  { note: 440.00, duration: 0.6 }, // A4
  { note: 349.23, duration: 0.6 }, // F4
  { note: 329.63, duration: 0.6 }, // E4
  { note: 293.66, duration: 0.8 }, // D4

  // Happy Birthday To You
  { note: 466.16, duration: 0.4 }, // Bb4
  { note: 466.16, duration: 0.2 }, // Bb4
  { note: 440.00, duration: 0.6 }, // A4
  { note: 349.23, duration: 0.6 }, // F4
  { note: 392.00, duration: 0.6 }, // G4
  { note: 349.23, duration: 1.2 }  // F4
];

function playNote(freq, duration) {
  if (!audioCtx || audioCtx.state === 'suspended') return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration - 0.05);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function startMelodyLoop() {
  let index = 0;
  function step() {
    if (!isMusicPlaying) return;
    const current = birthdayNotes[index];
    playNote(current.note, current.duration);
    index = (index + 1) % birthdayNotes.length;
    melodyInterval = setTimeout(step, current.duration * 1000 + 80);
  }
  step();
}

function initAudioPlayer() {
  const toggleBtn = document.getElementById('audio-toggle');
  const visualizer = document.getElementById('visualizer');
  const sfxBtn = document.getElementById('sfx-toggle');
  const sfxIcon = document.getElementById('sfx-icon');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      initAudioContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      isMusicPlaying = !isMusicPlaying;
      if (isMusicPlaying) {
        toggleBtn.querySelector('.audio-text').textContent = 'Pause Music';
        visualizer.classList.add('playing');
        startMelodyLoop();
      } else {
        toggleBtn.querySelector('.audio-text').textContent = 'Play Music';
        visualizer.classList.remove('playing');
        if (melodyInterval) clearTimeout(melodyInterval);
      }
    });
  }
  
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) {
        sfxIcon.className = 'fa-solid fa-volume-high';
        showToast('🔊 Sound Effects Enabled');
      } else {
        sfxIcon.className = 'fa-solid fa-volume-xmark';
        showToast('🔇 Sound Effects Muted');
      }
    });
  }
}

// Sound Effect Generators
function playChimeSFX() {
  if (!sfxEnabled) return;
  initAudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const now = audioCtx.currentTime;
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.08);
    gain.gain.setValueAtTime(0.12, now + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.3);
  });
}

function playBlowSFX() {
  if (!sfxEnabled) return;
  initAudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  // White noise puff sound for candle blow
  const bufferSize = audioCtx.sampleRate * 0.3;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  
  noise.start();
}

function playHeartSFX() {
  if (!sfxEnabled) return;
  initAudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.25);
}

/* --------------------------------------------------------------------------
   4. Interactive Birthday Cake & Candle Blowing Logic
   -------------------------------------------------------------------------- */
const blownCandles = new Set();

function blowCandle(id) {
  if (blownCandles.has(id)) return;
  
  blownCandles.add(id);
  playBlowSFX();
  
  const candleEl = document.getElementById(`candle-${id}`);
  if (candleEl) {
    candleEl.classList.add('blown');
  }
  
  // Check if all 3 candles are blown
  if (blownCandles.size === 3) {
    handleAllCandlesBlown();
  }
}

function blowAllCandles() {
  [1, 2, 3].forEach(id => blowCandle(id));
}

function handleAllCandlesBlown() {
  const wishStatus = document.getElementById('wish-status');
  const blowBtn = document.getElementById('blow-all-btn');
  
  if (wishStatus) wishStatus.classList.remove('hidden');
  if (blowBtn) blowBtn.classList.add('hidden');
  
  triggerConfettiExplosion();
  showToast("🎉 Wish Made! May all your dreams come true, Mihnaz!");
}

/* --------------------------------------------------------------------------
   5. Memory Cards Flip Interaction
   -------------------------------------------------------------------------- */
function flipMemoryCard(card) {
  playChimeSFX();
  card.classList.toggle('flipped');
}

/* --------------------------------------------------------------------------
   6. Affirmations Wall Interaction
   -------------------------------------------------------------------------- */
function revealAffirmation(el, text) {
  playChimeSFX();
  const displayBox = document.getElementById('affirmation-display');
  const textEl = document.getElementById('affirmation-text');
  
  if (displayBox && textEl) {
    textEl.innerText = text;
    displayBox.classList.remove('hidden');
  }
}

/* --------------------------------------------------------------------------
   7. Gift Box & Surprise Modal Logic
   -------------------------------------------------------------------------- */
function openSurpriseModal() {
  playChimeSFX();
  const modal = document.getElementById('gift-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeSurpriseModal() {
  const modal = document.getElementById('gift-modal');
  if (modal) modal.classList.add('hidden');
}

function unwrapGift() {
  const giftBox = document.getElementById('gift-box');
  const giftContent = document.getElementById('gift-content');
  
  if (giftBox && giftContent) {
    giftBox.classList.add('unwrapped');
    playChimeSFX();
    
    setTimeout(() => {
      giftBox.classList.add('hidden');
      giftContent.classList.remove('hidden');
      triggerConfettiExplosion();
    }, 500);
  }
}

/* --------------------------------------------------------------------------
   8. QR Code & Link Sharing Modal
   -------------------------------------------------------------------------- */
function openQRModal() {
  playChimeSFX();
  const currentUrl = window.location.href;
  const qrImg = document.getElementById('qr-code-img');
  const qrUrlText = document.getElementById('qr-url-text');
  
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&color=7b2cbf&bgcolor=ffffff`;
  }
  if (qrUrlText) {
    qrUrlText.innerText = currentUrl;
  }
  
  const modal = document.getElementById('qr-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeQRModal() {
  const modal = document.getElementById('qr-modal');
  if (modal) modal.classList.add('hidden');
}

function copyAppUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast("📋 App link copied to clipboard!");
  }).catch(() => {
    showToast("📋 App link: " + url);
  });
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/* --------------------------------------------------------------------------
   9. Image Error Fallback Handlers
   -------------------------------------------------------------------------- */
function handlePhotoError(img) {
  // If local asset missing, fallback to inline SVG elegant placeholder
  img.onerror = null;
  img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23ff758c"/><stop offset="100%" stop-color="%239d4edd"/></linearGradient></defs><rect width="300" height="400" fill="url(%23bg)"/><text x="150" y="190" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">👑 Mihnaz</text><text x="150" y="225" fill="%23ffd166" font-family="sans-serif" font-size="16" text-anchor="middle">The Best Soul Ever</text></svg>';
}

function handleMemoryImgError(img, type) {
  img.onerror = null;
  const colors = {
    peonies: '%23ff758c',
    cake: '%239d4edd',
    stars: '%23ffd166'
  };
  const c = colors[type] || '%23ff758c';
  img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="170" viewBox="0 0 240 170"><rect width="240" height="170" fill="${c}" opacity="0.3"/><text x="120" y="90" fill="%23ffffff" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">✨ ${type.toUpperCase()}</text></svg>`;
}
