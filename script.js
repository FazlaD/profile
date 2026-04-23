document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');
        
        // Change icon (Menu to X)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('nav-active')) {
            icon.setAttribute('data-feather', 'x');
        } else {
            icon.setAttribute('data-feather', 'menu');
        }
        feather.replace(); // re-render icon
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                const icon = hamburger.querySelector('i');
                icon.setAttribute('data-feather', 'menu');
                feather.replace();
            }
        });
    });

    // --- Sticky Navbar & Active Link Update on Scroll ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add slight offset for better UX
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    // Add fade-in class to elements we want to animate
    const animatableElements = document.querySelectorAll('.section-header, .about-text, .stat-item, .skill-category, .project-card, .contact-info, .contact-form');
    
    animatableElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    animatableElements.forEach(el => {
        appearOnScroll.observe(el);
    });
});
