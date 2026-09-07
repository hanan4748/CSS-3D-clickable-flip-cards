/**
 * AETHER // Next-Gen Spatial Hardware
 * Interactive Progressive Enhancement for CSS 3D Flip Cards
 * 
 * NOTE: The 3D flip card effect functions 100% via pure CSS / SCSS
 * (using the input:checkbox + label state hack).
 * This script provides progressive enhancements:
 * 1. Web Audio API synthesized sci-fi sound effects
 * 2. 3D perspective mouse tilt effect
 * 3. Keyboard accessibility (Space/Enter keys on labels)
 * 4. "Flip All" & "Reset All" demonstration controls
 */

// --- Audio Synthesizer (Zero external audio files needed) ---
class SciFiAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Futuristic swoosh/hologram flip tone
  playFlipSound(isBack) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const now = this.ctx.currentTime;
      osc.type = 'sine';

      if (isBack) {
        // Upward energetic sweep
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.18);
      } else {
        // Downward soft settle
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);
      }

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  }

  // Tech confirm click
  playConfirmSound() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(780, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }
}

const soundEngine = new SciFiAudio();

// --- Toast Notification System ---
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Global function for Pre-Order Buttons
window.handlePreOrder = function(productName, price) {
  soundEngine.playConfirmSound();
  showToast(`Pre-order reservation placed for ${productName} (${price})!`);
};

// --- DOM Initializations ---
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.flip-toggle');
  const cards = document.querySelectorAll('.flip-card');
  const flipAllBtn = document.getElementById('flip-all-btn');
  const resetAllBtn = document.getElementById('reset-all-btn');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');

  // 1. Audio and State monitoring on flip checkboxes
  checkboxes.forEach((cb) => {
    cb.addEventListener('change', (e) => {
      soundEngine.playFlipSound(e.target.checked);
    });
  });

  // 2. Keyboard Accessibility for <label role="button">
  const actionLabels = document.querySelectorAll('.flip-btn, .close-flip-btn, .return-btn');
  actionLabels.forEach(label => {
    label.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const targetId = label.getAttribute('for');
        const checkbox = document.getElementById(targetId);
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          // Dispatch change event so listener fires
          checkbox.dispatchEvent(new Event('change'));
        }
      }
    });
  });

  // 3. Subtle 3D Gyro/Mouse Tilt Effect (Enhancing the translateZ 3D layers)
  cards.forEach(card => {
    const cardContent = card.querySelector('.card-content');
    const checkbox = card.querySelector('.flip-toggle');

    card.addEventListener('mousemove', (e) => {
      // Only tilt when not in mid-flip transition
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Limit tilt to 6 degrees max for tasteful subtle parallax
      const tiltX = ((y - centerY) / centerY) * -6;
      const tiltY = ((x - centerX) / centerX) * 6;

      const isFlipped = checkbox.checked;
      const baseRotationY = isFlipped ? 180 : 0;

      cardContent.style.transform = `rotateY(${baseRotationY + (isFlipped ? -tiltY : tiltY)}deg) rotateX(${tiltX}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      const isFlipped = checkbox.checked;
      cardContent.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    });
  });

  // 4. Quick Demonstration Controls
  if (flipAllBtn) {
    flipAllBtn.addEventListener('click', () => {
      soundEngine.playFlipSound(true);
      checkboxes.forEach(cb => {
        cb.checked = true;
      });
      showToast('Flipped all cards to technical architecture view');
    });
  }

  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', () => {
      soundEngine.playFlipSound(false);
      checkboxes.forEach(cb => {
        cb.checked = false;
        const cardContent = cb.parentElement.querySelector('.card-content');
        if (cardContent) {
          cardContent.style.transform = 'rotateY(0deg)';
        }
      });
      showToast('Reset all cards to overview showcase');
    });
  }

  // 5. Sound Toggle Button
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEngine.enabled = !soundEngine.enabled;
      if (soundEngine.enabled) {
        soundToggleBtn.classList.add('active');
        soundToggleBtn.setAttribute('aria-pressed', 'true');
        soundToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
          Audio Feedback: On
        `;
        soundEngine.playConfirmSound();
      } else {
        soundToggleBtn.classList.remove('active');
        soundToggleBtn.setAttribute('aria-pressed', 'false');
        soundToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"/>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M23 9l-6 6M17 9l6 6"/>
          </svg>
          Audio Feedback: Off
        `;
      }
    });
  }
});
