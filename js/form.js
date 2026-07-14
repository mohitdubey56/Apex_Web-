/* ============================================================
   APEX COMPUTER INSTITUTE — form.js
   Handles: Form validation (contact + admission),
            Per-field error messages, Toast notifications
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initAdmissionForm();
});

/* ── Shared Validation Helpers ──────────────────────────────── */
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(field, msg) {
  field.classList.add('invalid');
  field.classList.remove('valid');
  let errEl = field.parentElement.querySelector('.field-error');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'field-error';
    errEl.setAttribute('role', 'alert');
    field.parentElement.appendChild(errEl);
  }
  errEl.textContent = msg;
}

function clearError(field) {
  field.classList.remove('invalid');
  field.classList.add('valid');
  const errEl = field.parentElement.querySelector('.field-error');
  if (errEl) errEl.textContent = '';
}

function validateField(field) {
  const val  = field.value.trim();
  const name = field.name || field.id;

  if (field.required && !val) {
    setError(field, 'यह field required है।');
    return false;
  }

  if (name === 'phone' || name === 'mobile' || name === 'whatsapp') {
    const digits = val.replace(/\D/g, '');
    if (digits && !PHONE_RE.test(digits)) {
      setError(field, 'Valid 10-digit mobile number enter करें।');
      return false;
    }
  }

  if (name === 'email' && val && !EMAIL_RE.test(val)) {
    setError(field, 'Valid email address enter करें।');
    return false;
  }

  if (field.tagName === 'SELECT' && field.required && (!val || val === '')) {
    setError(field, 'एक option select करें।');
    return false;
  }

  clearError(field);
  return true;
}

/* ── Contact Form ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = form.querySelectorAll('input, textarea, select');

  // Live validation on blur
  fields.forEach(f => {
    f.addEventListener('blur', () => validateField(f));
    f.addEventListener('input', () => {
      if (f.classList.contains('invalid')) validateField(f);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    fields.forEach(f => { if (!validateField(f)) valid = false; });

    if (!valid) {
      showToast('error', 'Form Incomplete', 'Please fill all required fields correctly.');
      form.querySelector('.invalid')?.focus();
      return;
    }

    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(response => {
        if (!response.ok) throw new Error('failed');
        showToast('success', 'Message Sent! 🎉', 'Hum aapko jald hi contact karenge. Thank you!');
        form.reset();
        fields.forEach(f => f.classList.remove('valid', 'invalid'));
      })
      .catch(() => {
        showToast('error', 'Submission Failed', 'Kuch galat ho gaya. Please call us directly at +91 98765 43210.');
      });
  });
}


/* ── Admission Form ─────────────────────────────────────────── */
function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;

  const fields    = form.querySelectorAll('input:not([type=radio]):not([type=checkbox]), textarea, select');
  const radios    = form.querySelectorAll('input[type=radio]');
  const checkbox  = form.querySelector('input[type=checkbox]');

  // Live validation
  fields.forEach(f => {
    f.addEventListener('blur', () => validateField(f));
    f.addEventListener('input', () => {
      if (f.classList.contains('invalid')) validateField(f);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    fields.forEach(f => { if (!validateField(f)) valid = false; });

    // Validate radio groups
    const radioGroups = {};
    radios.forEach(r => {
      radioGroups[r.name] = radioGroups[r.name] || [];
      radioGroups[r.name].push(r);
    });
    Object.entries(radioGroups).forEach(([groupName, group]) => {
      const checked = group.some(r => r.checked);
      const errTarget = group[group.length - 1].closest('.radio-group');
      if (!checked && errTarget) {
        let errEl = errTarget.querySelector('.field-error');
        if (!errEl) {
          errEl = document.createElement('span');
          errEl.className = 'field-error';
          errEl.setAttribute('role', 'alert');
          errTarget.appendChild(errEl);
        }
        errEl.textContent = 'एक option select करें।';
        valid = false;
      } else if (errTarget) {
        const errEl = errTarget.querySelector('.field-error');
        if (errEl) errEl.textContent = '';
      }
    });

    // Declaration checkbox
    if (checkbox && !checkbox.checked) {
      setError(checkbox, 'Declaration accept करना required है।');
      valid = false;
    }

    if (!valid) {
      showToast('error', 'Form Incomplete', 'Please all required fields fill karein.');
      form.querySelector('.invalid, .radio-group .field-error:not(:empty)')?.closest('[class]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(response => {
        if (!response.ok) throw new Error('failed');
        showToast('success', 'Application Submitted! 🎓', 'Aapka form successfully submit ho gaya. Hum 24 hrs mein contact karenge.');
        form.reset();
        fields.forEach(f => f.classList.remove('valid', 'invalid'));
        if (checkbox) clearError(checkbox);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => {
        showToast('error', 'Submission Failed', 'Kuch galat ho gaya. Please call us directly at +91 98765 43210.');
      });
  });
}
