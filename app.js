// Animate skill bars on scroll
document.addEventListener('DOMContentLoaded', () => {
  const skillFills = document.querySelectorAll('.skill-fill');

  // Reset widths initially for animation
  skillFills.forEach(el => {
    el.dataset.width = el.style.width;
    el.style.width = '0';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.width;
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(el => observer.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
