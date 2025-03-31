
function navigateTo(page) {
    // In a real application, this would redirect to the appropriate page
    alert(`Navigating to ${page.replace('-', ' ')} page`);
    // window.location.href = `${page}.html`;
}

// Add animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
