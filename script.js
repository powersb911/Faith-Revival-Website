document.addEventListener('DOMContentLoaded', function() {

    // ---- Scroll-triggered fade-in animations ----
    const fadeElements = document.querySelectorAll('.fade-section');

    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ---- Nav shrink on scroll ----
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ---- About Section Carousel ----
    const carousel = document.getElementById('aboutCarousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const dotsContainer = document.getElementById('carouselDots');
        let currentSlide = 0;
        let autoPlayTimer = null;
        const autoPlayDelay = 6000; // matches Ken Burns duration roughly

        // Build dot indicators
        slides.forEach(function(_, index) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                goToSlide(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dotsContainer.children[currentSlide].classList.remove('active');

            currentSlide = index;

            slides[currentSlide].classList.remove('active');
            // Force reflow so the Ken Burns animation restarts
            void slides[currentSlide].offsetWidth;
            slides[currentSlide].classList.add('active');
            dotsContainer.children[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
        }

        // Arrow click handlers
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoPlay();
        });

        // Start autoplay
        autoPlayTimer = setInterval(nextSlide, autoPlayDelay);

        // Pause autoplay on hover
        carousel.parentElement.addEventListener('mouseenter', function() {
            clearInterval(autoPlayTimer);
        });

        carousel.parentElement.addEventListener('mouseleave', function() {
            resetAutoPlay();
        });
    }

});