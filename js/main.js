document.addEventListener('DOMContentLoaded', function() {
  // Параллакс эффект
  function initParallax() {
    const parallax = document.querySelector('.hero-parallax');
    if (!parallax) return;
    
    // Скорость параллакса (можно регулировать)
    const parallaxSpeed = 0.3;
    
    function updateParallax() {
      const scrollPosition = window.pageYOffset;
      parallax.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
    }
    
    // Запускаем при загрузке и при скролле
    updateParallax();
    window.addEventListener('scroll', updateParallax);
  }

  // Плавная прокрутка
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Изменение навбара при скролле
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Инициализация при загрузке
    updateNavbar();
    window.addEventListener('scroll', updateNavbar);
  }

  // Инициализация всех функций
  initParallax();
  initSmoothScroll();
  initNavbar();
});

<script>
document.addEventListener('DOMContentLoaded', function() {
  const parallaxBg = document.querySelector('.parallax-bg');
  const parallaxFg = document.querySelector('.parallax-foreground');
  
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    if (parallaxBg) {
      parallaxBg.style.transform = `translate3d(0, ${scrollY * 0.4}px, -1px) scale(2)`;
    }
    
    if (parallaxFg) {
      parallaxFg.style.transform = `translate3d(-50%, calc(-50% + ${scrollY * 0.8}px), 0.5px) scale(0.5)`;
    }
  });
});
</script>