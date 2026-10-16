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

// Quote form: sends each request to info@ via FormSubmit
const form = document.getElementById('quote-form');
const status = document.getElementById('form-status');
const submitBtn = form && form.querySelector('button[type="submit"]');
if (form) form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  data.sms_consent = form.elements.sms_consent?.checked ? 'Yes, agreed to receive SMS' : 'No';
  data._subject = `Quote request: ${data.pickup} to ${data.delivery} (${data.name})`;
  data._template = 'table';
  data._replyto = data.email;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  status.textContent = '';
  status.classList.remove('form-ok', 'form-error');
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || 'Send failed');
    status.textContent = 'Thanks! Your request was sent. Our dispatch team will contact you shortly.';
    status.classList.add('form-ok');
    form.reset();
  } catch (err) {
    status.textContent = 'Sorry, we could not send your request. Please call (346) 646-3515 or email info@starhaulinglogistics.com.';
    status.classList.add('form-error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send request';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

// Load tiles: preselect the load type in the quote form
document.querySelectorAll('.load[data-load]').forEach((tile) => {
  tile.addEventListener('click', () => {
    const select = document.getElementById('f-service');
    if (select) select.value = tile.dataset.load;
  });
});
