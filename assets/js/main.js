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

// Contact form handler -> opens mailto with prefilled content
function cmhContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name?.value?.trim() || '';
  const email = form.email?.value?.trim() || '';
  const org = form.org?.value?.trim() || '';
  const msg = form.message?.value?.trim() || '';
  const subject = encodeURIComponent('Consultation Inquiry from Website');
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    org ? `Organization: ${org}` : null,
    '',
    msg
  ].filter(Boolean);
  const body = encodeURIComponent(bodyLines.join('\n'));
  const mailto = `mailto:caryn@cmh365.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  return false;
}
