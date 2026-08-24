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

    // --- Reservation Form Validation ---
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');
    
    if (fechaInput && horaInput) {
        const validateDateTime = () => {
            const fechaVal = fechaInput.value;
            const horaVal = horaInput.value;
            
            if (!fechaVal || !horaVal) return;
            
            const date = new Date(fechaVal);
            const day = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
            
            // Cerrado Martes (2) y Domingo (0)
            if (day === 0 || day === 2) {
                alert('Lo sentimos, los martes y domingos estamos cerrados. Por favor, elige otro día.');
                fechaInput.value = '';
                return;
            }
            
            const [hours, minutes] = horaVal.split(':').map(Number);
            const time = hours + minutes / 60;
            
            // Horario general: 09:30 (9.5) a 20:00 (20)
            if (time < 9.5 || time > 20) {
                alert('El horario de apertura es a partir de las 09:30 hasta las 20:00.');
                horaInput.value = '';
                return;
            }
            
            // Descanso de 13:30 (13.5) a 16:00 (16) excepto el viernes (5) que es ininterrumpido
            // Y el sábado (6) que cerramos a las 13:30
            if (day === 6 && time > 13.5) {
                alert('Los sábados cerramos a las 13:30.');
                horaInput.value = '';
                return;
            }
            
            if (day !== 5 && day !== 6 && time >= 13.5 && time < 16) {
                alert('Nuestro horario de descanso es de 13:30 a 16:00.');
                horaInput.value = '';
                return;
            }
        };

        fechaInput.addEventListener('change', validateDateTime);
        horaInput.addEventListener('change', validateDateTime);
    }
});
