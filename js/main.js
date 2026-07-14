/* ============================================================
   APEX COMPUTER INSTITUTE — main.js
   Handles: Navbar behaviour, Dark Mode, Scroll-to-top,
            Active nav links, Hamburger menu
   ============================================================ */

'use strict';

/* ── Dark Mode (set BEFORE paint via inline script in head) ── */
(function () {
  const saved = localStorage.getItem('apex-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ── References ─────────────────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const scrollTopBtn= document.getElementById('scrollTop');
  const darkToggle  = document.querySelectorAll('.dark-toggle');
  const html        = document.documentElement;

  /* ── Navbar: solid class on non-hero pages ─────────────── */
  const isHero = document.body.classList.contains('has-hero');
  if (!isHero && navbar) navbar.classList.add('solid');

  /* ── Navbar scroll behaviour ────────────────────────────── */
  function handleScroll() {
    if (!navbar) return;

    if (isHero) {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll-to-top visibility
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── Scroll-to-top ──────────────────────────────────────── */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  }

  /* ── Dark Mode Toggle ───────────────────────────────────── */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('apex-theme', theme);
    darkToggle.forEach(btn => {
      const icon = btn.querySelector('i') || btn;
      if (icon.tagName === 'I') {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      } else {
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  darkToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  // Set initial icon
  const savedTheme = localStorage.getItem('apex-theme') || 'light';
  applyTheme(savedTheme);

  /* ── Active Nav Links ───────────────────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop() || 'index.html';
    if (
      linkPage === path ||
      (path === '' && linkPage === 'index.html') ||
      (path === 'index.html' && linkPage === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  /* ── Hamburger / Mobile Menu ────────────────────────────── */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ── WhatsApp Float init ────────────────────────────────── */
  const waBtn = document.querySelector('.whatsapp-btn');
  if (waBtn) {
    waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waBtn.setAttribute('target', '_blank');
    waBtn.setAttribute('rel', 'noopener noreferrer');
  }

});

/* ── Toast Utility (global) ─────────────────────────────────── */
function showToast(type = 'success', title = '', message = '', duration = 4000) {
  const container = document.querySelector('.toast-container') ||
    (() => {
      const el = document.createElement('div');
      el.className = 'toast-container';
      document.body.appendChild(el);
      return el;
    })();

  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="${icons[type] || icons.info} toast-icon" aria-hidden="true"></i>
    <div class="toast-body">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
    <button class="toast-close" aria-label="Close notification"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(toast);

  const close = () => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', close);
  if (duration > 0) setTimeout(close, duration);
}

window.showToast = showToast;
