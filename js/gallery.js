/* ============================================================
   APEX COMPUTER INSTITUTE — gallery.js
   Handles: Gallery filter tabs, Lightbox (pure JS),
            Keyboard navigation, Lazy loading
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
  initLightbox();
});

/* ── Gallery Filter ─────────────────────────────────────────── */
function initGalleryFilter() {
  const tabs  = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.gallery-item');
  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show/hide items
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        const show = (filter === 'all' || cat === filter);
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';

        setTimeout(() => {
          if (show) {
            item.style.display = '';
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.display = 'none';
          }
        }, 50);
      });
    });
  });
}

/* ── Lightbox ───────────────────────────────────────────────── */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  // Build lightbox overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image viewer');
  overlay.innerHTML = `
    <div class="lb-backdrop"></div>
    <div class="lb-content">
      <button class="lb-close" aria-label="Close lightbox"><i class="fas fa-times"></i></button>
      <button class="lb-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>
      <button class="lb-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>
      <div class="lb-img-wrap">
        <img class="lb-img" src="" alt="" />
        <div class="lb-loader"><i class="fas fa-circle-notch fa-spin"></i></div>
      </div>
      <div class="lb-caption"></div>
      <div class="lb-counter"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const lbImg     = overlay.querySelector('.lb-img');
  const lbCaption = overlay.querySelector('.lb-caption');
  const lbCounter = overlay.querySelector('.lb-counter');
  const lbLoader  = overlay.querySelector('.lb-loader');
  let visibleItems = [];
  let currentIdx  = 0;

  function getVisible() {
    return Array.from(galleryItems).filter(i => i.style.display !== 'none');
  }

  function openLightbox(idx) {
    visibleItems = getVisible();
    currentIdx = Math.max(0, Math.min(idx, visibleItems.length - 1));
    showImage(currentIdx);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus trap
    overlay.querySelector('.lb-close').focus();
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showImage(idx) {
    visibleItems = getVisible();
    currentIdx = (idx + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentIdx];
    const img  = item.querySelector('img');
    const src  = img ? (img.getAttribute('data-full') || img.src) : '';
    const alt  = img ? img.alt : '';

    lbLoader.style.display = 'flex';
    lbImg.style.opacity = '0';

    const newImg = new Image();
    newImg.onload = () => {
      lbImg.src = src;
      lbImg.alt = alt;
      lbLoader.style.display = 'none';
      lbImg.style.opacity = '1';
    };
    newImg.onerror = () => {
      lbImg.src = src;
      lbImg.alt = alt;
      lbLoader.style.display = 'none';
      lbImg.style.opacity = '1';
    };
    newImg.src = src;

    lbCaption.textContent = alt;
    lbCounter.textContent = `${currentIdx + 1} / ${visibleItems.length}`;
  }

  // Attach open trigger to each item
  galleryItems.forEach((item, i) => {
    const wrapper = item.querySelector('.gallery-img-wrap') || item;
    wrapper.style.cursor = 'pointer';
    wrapper.addEventListener('click', () => {
      visibleItems = getVisible();
      const visIdx = visibleItems.indexOf(item);
      openLightbox(visIdx !== -1 ? visIdx : i);
    });
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('tabindex', '0');
    wrapper.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        visibleItems = getVisible();
        const visIdx = visibleItems.indexOf(item);
        openLightbox(visIdx !== -1 ? visIdx : i);
      }
    });
  });

  // Controls
  overlay.querySelector('.lb-close').addEventListener('click', closeLightbox);
  overlay.querySelector('.lb-prev').addEventListener('click', () => showImage(currentIdx - 1));
  overlay.querySelector('.lb-next').addEventListener('click', () => showImage(currentIdx + 1));
  overlay.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    switch (e.key) {
      case 'Escape':      closeLightbox(); break;
      case 'ArrowLeft':   showImage(currentIdx - 1); break;
      case 'ArrowRight':  showImage(currentIdx + 1); break;
    }
  });

  // Lightbox styles are in gallery.css (moved from JS for performance)
}

window.initGalleryFilter = initGalleryFilter;
window.initLightbox = initLightbox;
