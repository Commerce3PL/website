const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-navigation');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', String(menuToggle.getAttribute('aria-expanded') !== 'true'));
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) closeMenu();
});
document.getElementById('year').textContent = new Date().getFullYear();
for (const link of document.querySelectorAll('[data-service]')) {
  link.addEventListener('click', () => { document.getElementById('service').value = link.dataset.service; });
}
document.getElementById('inquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const inquiry = `Stow Show 3PL inquiry\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nService: ${data.get('service')}\n\n${data.get('message')}\n`;
  const subject = `Stow Show 3PL inquiry: ${data.get('service')}`;
  window.location.href = `mailto:stowflow3pl.la@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiry)}`;
  document.getElementById('form-status').textContent = 'Your email app will open with your inquiry. Review it and press Send. If it does not open, email stowflow3pl.la@gmail.com directly.';
});

const ticker = document.querySelector('.ticker');
const tickerToggle = document.querySelector('.ticker-toggle');
tickerToggle.addEventListener('click', () => {
  const paused = ticker.classList.toggle('is-paused');
  tickerToggle.setAttribute('aria-pressed', String(paused));
  tickerToggle.setAttribute('aria-label', paused ? 'Resume scrolling services' : 'Pause scrolling services');
  tickerToggle.textContent = paused ? 'Resume' : 'Pause';
});
