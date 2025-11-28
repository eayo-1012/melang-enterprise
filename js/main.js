document.addEventListener("DOMContentLoaded", () => {
  /* ================================
     MOBILE MENU TOGGLE
  ================================= */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
    });
  }

  /* ================================
     SMOOTH SCROLL FOR ANCHORS
  ================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

        // Close mobile menu after click
        if (window.innerWidth <= 768 && mobileMenu.style.display === "flex") {
          mobileMenu.style.display = "none";
        }
      }
    });
  });

  /* ================================
     FAQ ACCORDION
  ================================= */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  /* ================================
     TESTIMONIAL SLIDER WITH AUTO-SLIDE
  ================================= */
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".slider-controls .prev");
  const nextBtn = document.querySelector(".slider-controls .next");
  let currentIndex = 0;
  let autoSlideInterval;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  }

  if (testimonials.length > 0) {
    showTestimonial(currentIndex);
    autoSlideInterval = setInterval(nextTestimonial, 5000); // auto-slide every 5 seconds
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { prevTestimonial(); resetAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { nextTestimonial(); resetAutoSlide(); });

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextTestimonial, 5000);
  }

  /* ================================
     STATS COUNTER
  ================================= */
  const counters = document.querySelectorAll(".stat-number");
  const speed = 50;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 40);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.unobserve(counter);
      }
    }, { threshold: 0.6 });

    observer.observe(counter);
  });
});
