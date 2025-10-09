// Mobile nav toggle
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

// Highlight active nav based on URL path
(function() {
  const links = document.querySelectorAll('.nav-links a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();

// Contact form handler -> POST to Web3Forms (static-friendly backend)
async function cmhContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name?.value?.trim() || '';
  const email = form.email?.value?.trim() || '';
  const org = form.org?.value?.trim() || '';
  const msg = form.message?.value?.trim() || '';
  const subject = 'Consultation Inquiry from Website';

  const statusEl = document.getElementById('contactStatus');
  const key = (window.CONTACT && window.CONTACT.web3formsKey) || '';
  if (!key) {
    if (statusEl) statusEl.textContent = 'Form backend not configured yet. Please email info@cmh365.com directly.';
    return false;
  }

  const payload = {
    access_key: key,
    subject,
    from_name: name,
    reply_to: email,
    message: msg,
    organization: org,
    page: location.href
  };

  try {
    if (statusEl) statusEl.textContent = 'Sending...';
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      if (statusEl) statusEl.textContent = 'Thanks! Your message has been sent.';
      form.reset();
    } else {
      if (statusEl) statusEl.textContent = 'There was a problem sending your message. Please email info@cmh365.com.';
    }
  } catch (err) {
    if (statusEl) statusEl.textContent = 'Network error. Please email info@cmh365.com.';
  }
  return false;
}
