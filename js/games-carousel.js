// Games Carousel Functionality
function scrollGamesCarousel(direction) {
    const carousel = document.querySelector('.games-carousel');
    const container = document.querySelector('.games-carousel-container');
    const gameItem = document.querySelector('.game-item');
    
    if (!carousel || !container || !gameItem) return;
    
    const itemWidth = gameItem.offsetWidth;
    const gap = 32; // 2rem gap
    const scrollAmount = itemWidth + gap;
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Auto-hide carousel controls if only one item
function checkCarouselControls() {
    const carousel = document.querySelector('.games-carousel');
    const controls = document.querySelector('.games-carousel-controls');
    const gameItems = document.querySelectorAll('.game-item');
    
    if (gameItems.length <= 1) {
        controls.style.display = 'none';
    } else {
        controls.style.display = 'flex';
    }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    checkCarouselControls();
    
    // Add touch/swipe support for mobile
    const container = document.querySelector('.games-carousel-container');
    if (container) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    }
});