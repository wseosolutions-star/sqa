const components = [
  { id: 'header-container', path: 'components/header.html' },
  { id: 'hero-container', path: 'components/hero.html' },
  { id: 'experience-container', path: 'components/experience.html' },
  { id: 'skills-container', path: 'components/skills.html' },
  { id: 'contact-container', path: 'components/contact.html' },
  { id: 'footer-container', path: 'components/footer.html' }
];

async function loadComponent({ id, path }) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    container.innerHTML = await response.text();
  } catch (error) {
    console.error(`Could not load ${path}:`, error);
    container.innerHTML = `<div class="container py-3"><p class="load-error">Unable to load this section. Please refresh the page.</p></div>`;
  }
}

async function loadComponents() {
  await Promise.all(components.map(loadComponent));
  document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

document.addEventListener('componentsLoaded', () => {
  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const navbar = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.navbar-toggler');
  document.querySelectorAll('.navbar-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('show')) navToggle.click();
    });
  });

  document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('.form-status');
    status.textContent = 'Thanks. Your message is ready to be sent.';
    status.classList.add('is-visible');
    event.target.reset();
  });
});

loadComponents();
