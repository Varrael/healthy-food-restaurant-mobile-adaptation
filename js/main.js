document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к якорям
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Учитываем высоту навбара при прокрутке
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем мобильное меню после клика (если открыто)
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    // Изменение навбара при скролле
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // Проверяем позицию скролла
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
    }

    // Параллакс эффекты
    function initParallaxEffects() {
        // Параллакс для героя
        const heroBg = document.querySelector('.hero-bg');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            }
            
            // Активируем класс при достижении определенной позиции
            if (scrollPosition > 100) {
                document.body.classList.add('parallax-active');
            } else {
                document.body.classList.remove('parallax-active');
            }
        });
        
        // Параллакс при наведении на элементы галереи
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / this.offsetWidth;
                const y = (e.clientY - rect.top) / this.offsetHeight;
                const img = this.querySelector('.gallery-img');
                
                img.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
            });
            
            item.addEventListener('mouseleave', function() {
                const img = this.querySelector('.gallery-img');
                img.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Анимация счетчиков
    function animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        const speed = 200;
        
        function animateCounter(counter) {
            const target = +counter.getAttribute('data-counter');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(counter), 1);
            } else {
                counter.innerText = target;
            }
        }
        
        // Запускаем анимацию при появлении в области видимости
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        const counterSection = document.querySelector('#counter-section');
        if (counterSection) {
            observer.observe(counterSection);
        }
    }

    // Инициализация всех функций
    function initAll() {
        initSmoothScrolling();
        handleNavbarScroll();
        window.addEventListener('scroll', handleNavbarScroll);
        initParallaxEffects();
        animateCounters();
        
        // Инициализируем состояние навбара при загрузке
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        }
    }

    // Запускаем инициализацию
    initAll();
});