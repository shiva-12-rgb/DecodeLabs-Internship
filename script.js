// ---------------------------------------
// Mobile nav toggle
// ---------------------------------------
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu after a nav link is tapped
primaryNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------------
// Project filtering
// ---------------------------------------
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    button.classList.add('is-active');

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

// ---------------------------------------
// Contact form validation (client-side only)
// ---------------------------------------
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const validators = {
  name: value => value.trim().length >= 2 || 'Enter your full name.',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Enter a valid email address.',
  message: value => value.trim().length >= 10 || 'Message should be at least 10 characters.'
};

form.addEventListener('submit', event => {
  event.preventDefault();
  let isValid = true;

  Object.keys(validators).forEach(fieldName => {
    const field = form.elements[fieldName];
    const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
    const result = validators[fieldName](field.value);

    field.dataset.touched = 'true';

    if (result === true) {
      errorEl.textContent = '';
    } else {
      errorEl.textContent = result;
      isValid = false;
    }
  });

  if (isValid) {
    formStatus.textContent = 'Message ready to send — connect this form to a backend or form service to go live.';
    form.reset();
    Object.keys(validators).forEach(fieldName => {
      form.elements[fieldName].dataset.touched = 'false';
    });
  } else {
    formStatus.textContent = 'Please fix the highlighted fields.';
  }
});
