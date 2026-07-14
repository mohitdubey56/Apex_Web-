/* ============================================================
   APEX COMPUTER INSTITUTE — animations.js
   Handles: Preloader, Typewriter, Counter animation,
            Scroll reveal (IntersectionObserver)
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Preloader ──────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    };
    document.body.style.overflow = 'hidden';
    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 1200);
    } else {
      window.addEventListener('load', () => setTimeout(hidePreloader, 1200));
    }
    // Fallback
    setTimeout(hidePreloader, 3000);
  }

  /* ── Typewriter Effect ──────────────────────────────────── */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const words   = ['Naukri', 'Success', 'Confidence', 'Future'];
    let wIdx      = 0;
    let cIdx      = 0;
    let deleting  = false;
    let pauseFlag = false;

    function type() {
      if (pauseFlag) return;

      const word    = words[wIdx];
      typeEl.textContent = deleting
        ? word.substring(0, cIdx - 1)
        : word.substring(0, cIdx + 1);

      if (!deleting) cIdx++;
      else cIdx--;

      let delay = deleting ? 60 : 100;

      if (!deleting && cIdx === word.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        delay = 400;
      }
      setTimeout(type, delay);
    }
    setTimeout(type, 800);
  }

  /* ── Counter Animation ──────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el      = entry.target;
        const target  = parseInt(el.getAttribute('data-count'), 10);
        const suffix  = el.getAttribute('data-suffix') || '';
        const prefix  = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const step    = 16;
        const steps   = Math.floor(duration / step);
        let current   = 0;

        const increment = () => {
          current += Math.ceil(target / steps);
          if (current >= target) {
            el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
            return;
          }
          el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
          setTimeout(increment, step);
        };
        increment();
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ── Scroll Reveal ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── Testimonials Auto-Slider ───────────────────────────── */
  initTestimonialSlider();

});

function initTestimonialSlider() {
  const slider    = document.querySelector('.testimonial-slider');
  if (!slider) return;

  const track     = slider.querySelector('.testimonial-track');
  const cards     = slider.querySelectorAll('.testimonial-card');
  const dotsWrap  = slider.querySelector('.testimonial-dots');
  const prevBtn   = slider.querySelector('.slider-prev');
  const nextBtn   = slider.querySelector('.slider-next');

  if (!track || cards.length === 0) return;

  let current  = 0;
  let autoPlay = null;
  const total  = cards.length;

  // Create dots
  if (dotsWrap) {
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function startAuto() {
    stopAuto();
    autoPlay = setInterval(() => goTo(current + 1), 4000);
  }

  function stopAuto() {
    if (autoPlay) { clearInterval(autoPlay); autoPlay = null; }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // Touch swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    startAuto();
  });

  startAuto();
  updateDots();
}

// Export for external use
window.initTestimonialSlider = initTestimonialSlider;
