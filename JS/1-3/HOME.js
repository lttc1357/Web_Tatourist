 // Simple Slideshow Script
      let currentSlide = 0;
      const slides = document.querySelectorAll('.testimonial-slideshow .slide');
      const prevBtn = document.querySelector('.testimonial-slideshow .prev');
      const nextBtn = document.querySelector('.testimonial-slideshow .next');
  
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.remove('active');
          if (i === index) slide.classList.add('active');
        });
      }
  
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
  
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
  
      setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 3000);