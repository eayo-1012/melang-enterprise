// js/main.js
document.addEventListener('DOMContentLoaded', () => {

  /* ===== MOBILE NAV TOGGLE ===== */
  const toggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('.nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');

    if (nav.classList.contains('open')) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '20px';
      nav.style.top = '70px';
      nav.style.background = 'rgba(255,255,255,0.95)';
      nav.style.padding = '12px';
      nav.style.borderRadius = '10px';
      nav.style.boxShadow = '0 8px 28px rgba(0,0,0,0.08)';
    } else {
      nav.style.display = '';
      nav.style.flexDirection = '';
      nav.style.position = '';
      nav.style.right = '';
      nav.style.top = '';
      nav.style.background = '';
      nav.style.padding = '';
      nav.style.borderRadius = '';
      nav.style.boxShadow = '';
    }
  });

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  /* ===== FAQ TOGGLE ===== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  /* ===== TESTIMONIAL SLIDER ===== */
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.slider-controls .prev');
  const nextBtn = document.querySelector('.slider-controls .next');
  let currentIndex = 0;

  function showTestimonial(index){
    testimonials.forEach((t,i) => t.classList.toggle('active', i === index));
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });

  showTestimonial(currentIndex);

  /* ===== STATS COUNTER (ANIMATED) ===== */
  const counters = document.querySelectorAll('.stat-number');
  const options = { root: null, threshold: 0.4 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 200);

          function updateCounter() {
            if(count < target){
              count += increment;
              if(count > target) count = target;
              counter.textContent = count;
              requestAnimationFrame(updateCounter);
            }
          }
          updateCounter();
        });
        observer.disconnect(); // Animate once
      }
    });
  }, options);

  if(document.querySelector('#stats')){
    observer.observe(document.querySelector('#stats'));
  }

});
