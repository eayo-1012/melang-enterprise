document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     MOBILE MENU TOGGLE
  ================================= */
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  navToggle?.addEventListener("click", () => {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    nav.style.flexDirection = "column";
    nav.style.background = "#fff";
    nav.style.position = "absolute";
    nav.style.top = "70px";
    nav.style.left = "0";
    nav.style.width = "100%";
    nav.style.padding = "20px 0";
    nav.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
    nav.style.textAlign = "center";
  });

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
        if (window.innerWidth <= 920) nav.style.display = "none";
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
     TESTIMONIAL SLIDER
  ================================= */
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".slider-controls .prev");
  const nextBtn = document.querySelector(".slider-controls .next");
  let currentIndex = 0;
  let autoSlide;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => t.classList.toggle("active", i === index));
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  }

  if (testimonials.length) {
    showTestimonial(currentIndex);
    autoSlide = setInterval(nextTestimonial, 5000);
  }

  nextBtn?.addEventListener("click", () => {
    nextTestimonial();
    resetAutoSlide();
  });

  prevBtn?.addEventListener("click", () => {
    prevTestimonial();
    resetAutoSlide();
  });

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextTestimonial, 5000);
  }

  /* ================================
     STATS COUNTER (IF YOU USE)
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
