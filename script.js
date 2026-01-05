// Sticky header on scroll
let header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide go to top button
    const gotop = document.querySelector('.gotop');
    if (currentScroll > 250) {
        gotop.classList.add('active');
    } else {
        gotop.classList.remove('active');
    }
    
    // Close mobile menu on scroll (with debounce for better performance)
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        const menuBtn = document.querySelector('.menubtn');
        if (navbar && navbar.classList.contains('active')) {
            // Only close if scrolled significantly
            if (Math.abs(currentScroll - lastScroll) > 50) {
                navbar.classList.remove('active');
                if (menuBtn) menuBtn.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
        }
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menubtn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

// Function to close mobile menu
function closeMobileMenu() {
    if (navbar) navbar.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
}

// Function to open mobile menu
function openMobileMenu() {
    if (navbar) navbar.classList.add('active');
    if (menuBtn) menuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Prevent background scroll on iOS
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

if (menuBtn) {
    // Use touchstart for better mobile responsiveness
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navbar.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Prevent menu button from closing menu when clicked
    menuBtn.addEventListener('touchstart', (e) => {
        e.stopPropagation();
    });
}

// Close mobile menu when clicking on a link
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Small delay for smooth transition
            setTimeout(() => {
                closeMobileMenu();
            }, 100);
        });
    });
}

// Close mobile menu when clicking outside or on backdrop
if (navbar && menuBtn) {
    document.addEventListener('click', (e) => {
        const isMenuOpen = navbar.classList.contains('active');
        const isClickInsideNav = navbar.contains(e.target);
        const isClickOnMenuBtn = menuBtn.contains(e.target);
        
        if (isMenuOpen && !isClickInsideNav && !isClickOnMenuBtn) {
            closeMobileMenu();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Handle window resize - close menu if switching to desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navbar && navbar.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Go to top button functionality
const gotop = document.querySelector('.gotop');
gotop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add animation on scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about .content, .about .image, .services .box-container .box, .reviews .clients-reviews .review, .contactinfo .box');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Form validation and submission (optional enhancement)
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (name && email && message) {
            // Here you would normally send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Set initial opacity for smooth loading
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
    }
});
