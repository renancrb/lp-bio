// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links âncora
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header transparente que fica sólido no scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
    });

    // Animação de entrada para elementos usando IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos para animar - adaptados para a nova estrutura
    const animateElements = document.querySelectorAll('.numbered-card, .publico-item, .step-item, .depoimento-destaque');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';        observer.observe(el);
    });

    // Contador de cliques nos CTAs para analytics
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('CTA clicado:', this.textContent);
        });
    });

    // Carrossel de fotos — Prova Social
    const photoCarousel = document.querySelector('.photo-carousel');

    if (photoCarousel) {
        const slides = photoCarousel.querySelectorAll('.carousel-slide');
        const prevBtn = photoCarousel.querySelector('.carousel-prev');
        const nextBtn = photoCarousel.querySelector('.carousel-next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === index);
            });
            currentSlide = index;
        }

        prevBtn.addEventListener('click', function() {
            const nextIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(nextIndex);
        });

        nextBtn.addEventListener('click', function() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        });
    }
});
