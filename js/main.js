// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle) {
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
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});

/* ---------------------------------------- */
/* FAQ ACCORDION */
/* ---------------------------------------- */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    q.parentElement.classList.toggle('open');
  });
});

/* ---------------------------------------- */
/* TESTIMONIAL SLIDER */
/* ---------------------------------------- */
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial');

function showSlide(index){
  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.add('active');
}

document.querySelector('.next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

showSlide(0);

/* ---------------------------------------- */
/* LIGHTBOX GALLERY */
/* ---------------------------------------- */
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => {
    const lb = document.createElement('div');
    lb.classList.add('lightbox');
    lb.innerHTML = `<img src="${img.src}">`;
    lb.addEventListener('click', () => lb.remove());
    document.body.appendChild(lb);
  });
});

/* ---------------------------------------- */
/* STATS COUNTER */
/* ---------------------------------------- */
const statNumbers = document.querySelectorAll('.stat-number');
let statsShown = false;

function animateStats(){
  statNumbers.forEach(num => {
    const target = +num.dataset.target;
    let count = 0;

    const update = setInterval(() => {
      count += Math.ceil(target / 120);
      num.textContent = count;
      if(count >= target){
        num.textContent = target;
        clearInterval(update);
      }
    }, 20);
  });
}

window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('#stats');
  const top = statsSection.getBoundingClientRect().top;

  if(top < window.innerHeight && !statsShown){
    statsShown = true;
    animateStats();
  }
});

/* ---------------------------------------- */
/* PROCESS SCROLL ANIMATION */
/* ---------------------------------------- */
const steps = document.querySelectorAll('.step');

function revealSteps(){
  steps.forEach(step => {
    const top = step.getBoundingClientRect().top;
    if(top < window.innerHeight - 50){
      step.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSteps);
revealSteps();

