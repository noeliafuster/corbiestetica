document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('is-active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('is-active');
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.remove('transparent-header');
            header.classList.add('scrolled-header');
        } else {
            header.classList.add('transparent-header');
            header.classList.remove('scrolled-header');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Reveal Elements on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // --- Testimonials Carousel ---
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        const slideCount = slides.length;
        
        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            slides.forEach((slide, i) => {
                if (i === index) slide.classList.add('active');
                else slide.classList.remove('active');
            });
            
            dots.forEach((dot, i) => {
                if (i === index) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        };
        
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel(currentIndex);
        };
        
        let carouselInterval = setInterval(nextSlide, 5000);
        
        // Allow clicking on dots
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                clearInterval(carouselInterval);
                currentIndex = parseInt(e.target.getAttribute('data-index'));
                updateCarousel(currentIndex);
                carouselInterval = setInterval(nextSlide, 5000);
            });
        });
    }
});
