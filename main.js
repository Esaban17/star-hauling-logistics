// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  links.classList.toggle('open', !open);
});
links.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    links.classList.remove('open');
  }
});

// Quote form (test version: validates only, no sending yet)
const form = document.getElementById('quote-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  status.textContent = 'Thanks! In the live version this request goes straight to dispatch.';
  status.classList.add('form-ok');
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
