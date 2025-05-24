document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.u-hero-restaurant');
  
  if (hero) {
    const parallaxStrength = 0.3;
    let lastScrollPosition = 0;
    let ticking = false;
    
    function updateParallax(scrollPos) {
      const offset = scrollPos * parallaxStrength;
      hero.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    }
    
    window.addEventListener('scroll', function() {
      lastScrollPosition = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateParallax(lastScrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Инициализация
    updateParallax(window.scrollY);
  }
});