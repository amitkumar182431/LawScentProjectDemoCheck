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

// Create backdrop element for mobile menu
let backdrop = null;

function createBackdrop() {
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            z-index: 998;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        document.body.appendChild(backdrop);
        
        backdrop.addEventListener('click', () => {
            closeMobileMenu();
        });
    }
    return backdrop;
}

// Function to close mobile menu
function closeMobileMenu() {
    if (navbar) {
        navbar.classList.remove('active');
        // Reset menu items animation state
        const menuItems = navbar.querySelectorAll('a');
        menuItems.forEach(item => {
            item.style.animation = 'none';
            // Force reflow to reset animation
            void item.offsetWidth;
        });
    }
    if (menuBtn) menuBtn.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    if (backdrop) {
        backdrop.style.opacity = '0';
        backdrop.style.pointerEvents = 'none';
    }
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
    // Show backdrop
    const backdropEl = createBackdrop();
    backdropEl.style.pointerEvents = 'all';
    requestAnimationFrame(() => {
        backdropEl.style.opacity = '1';
    });
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
        const isClickOnBackdrop = backdrop && backdrop.contains(e.target);
        
        if (isMenuOpen && !isClickInsideNav && !isClickOnMenuBtn && !isClickOnBackdrop) {
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

// Job Application Form Modal
const openJobFormBtn = document.getElementById('openJobForm');
const closeJobFormBtn = document.getElementById('closeJobForm');
const jobFormModal = document.getElementById('jobFormModal');
const jobApplicationForm = document.getElementById('jobApplicationForm');

if (openJobFormBtn && jobFormModal) {
    openJobFormBtn.addEventListener('click', () => {
        jobFormModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeJobFormBtn && jobFormModal) {
    closeJobFormBtn.addEventListener('click', () => {
        jobFormModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking on overlay
if (jobFormModal) {
    const overlay = jobFormModal.querySelector('.job-form-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            jobFormModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && jobFormModal && jobFormModal.classList.contains('active')) {
        jobFormModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle job application form submission
if (jobApplicationForm) {
    jobApplicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(jobApplicationForm);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const position = formData.get('position');
        
        // Basic validation
        if (firstName && lastName && email && phone && position) {
            // Here you would normally send the form data to a server
            alert('Thank you for your application! We will review your submission and get back to you soon.');
            jobApplicationForm.reset();
            jobFormModal.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            alert('Please fill in all required fields.');
        }
    });
}
