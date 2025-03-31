
// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked);
});

// Check for saved user preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

// Carousel Functionality
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
const itemCount = items.length;
let intervalId;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + itemCount) % itemCount;
    updateCarousel();
}

function startAutoSlide() {
    intervalId = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        stopAutoSlide();
        startAutoSlide();
    });
});

// Start auto sliding
startAutoSlide();

// Pause on hover
document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoSlide);

 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
