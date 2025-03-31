
        function navigateTo(page) {
            // In a real application, this would redirect to the appropriate page
            alert(`Navigating to ${page} page`);
            // window.location.href = `${page}.html`;
        }

        // Mobile menu toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Add animations to dashboard cards
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            });
        });