// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll progress bar + header shadow
const progressBar = document.getElementById('progress-bar');
const header = document.getElementById('site-header');

function revealFallback() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
  header.classList.toggle('scrolled', scrollTop > 8);
  revealFallback();
}
document.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', revealFallback);
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Active nav link highlighting — recomputed from scratch on every scroll
// (avoids stale "active" state from incremental IntersectionObserver diffs)
const sections = document.querySelectorAll('main section[id]');
const navLinkMap = new Map();
document.querySelectorAll('.nav-link').forEach(link => {
  const id = link.getAttribute('href').replace('#', '');
  navLinkMap.set(id, link);
});

function updateActiveNavLink() {
  const markerY = window.innerHeight * 0.45;
  let currentId = null;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= markerY && rect.bottom > markerY) {
      currentId = section.id;
    }
  });
  navLinkMap.forEach((link, id) => link.classList.toggle('active', id === currentId));
}

document.addEventListener('scroll', updateActiveNavLink, { passive: true });
window.addEventListener('resize', updateActiveNavLink);
updateActiveNavLink();

// Reveal-on-scroll animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated stat counters
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));
