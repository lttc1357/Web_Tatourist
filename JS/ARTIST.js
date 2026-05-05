let currentSlide = 0;
const totalSlides = 3;
const sliderContainer = document.getElementById('sliderContainer');
const sliderDots = document.getElementById('sliderDots').children;

function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    
    // Update active dot
    for (let i = 0; i < sliderDots.length; i++) {
        sliderDots[i].classList.remove('active');
    }
    sliderDots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    
    // Loop the slides
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateSlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Auto-slide every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);