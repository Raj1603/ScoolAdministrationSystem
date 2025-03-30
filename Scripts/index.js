const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check local storage for dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }
});


document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});


let currentIndex = 0;
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector(".carousel-inner").style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    updateCarousel();
}

// Auto slide every 3 seconds
setInterval(nextSlide, 3000);
