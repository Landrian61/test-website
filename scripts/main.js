/*
==================================================
TECHARA WEBSITE - PROFESSIONAL JAVASCRIPT
==================================================
Author: Claude AI Assistant
Purpose: Provides minimal, professional interactivity
Features: 
- Navigation scroll effects
- Form validation
- Smooth scrolling
- Simple animations
- Accessibility features
==================================================
*/

/**
 * Initialize all functionality when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Techara website initialized');
    
    // Initialize all components
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeFormValidation();
    initializeSmoothScrolling();
    initializeAccessibility();
});

/* 
==================================================
NAVIGATION FUNCTIONALITY
==================================================
*/

/**
 * Initialize navigation scroll effects and active states
 */
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Pixels to scroll before changing navbar
    
    /**
     * Handle scroll events for navigation
     */
    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when user scrolls down
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttle scroll events for better performance
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                handleNavbarScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

/* 
==================================================
MOBILE MENU FUNCTIONALITY
==================================================
*/

/**
 * Initialize mobile hamburger menu functionality
 */
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    /**
     * Toggle mobile menu visibility
     */
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('mobile-active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('mobile-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-active');
        document.body.style.overflow = '';
    }
    
    // Hamburger click event
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize if screen becomes large
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });
}

/* 
==================================================
SCROLL ANIMATIONS
==================================================
*/

/**
 * Initialize intersection observer for scroll animations
 */
function initializeScrollAnimations() {
    // Configuration for intersection observer
    const observerOptions = {
        threshold: 0.1,                    // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'   // Trigger 50px before element enters viewport
    };
    
    /**
     * Callback function for intersection observer
     * @param {IntersectionObserverEntry[]} entries - Array of observed elements
     */
    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animations
                entry.target.classList.add('visible');
                
                // Add stagger effect for grid items (cards appearing one after another)
                if (entry.target.classList.contains('team-member') || 
                    entry.target.classList.contains('vision-card')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    // Delay each subsequent item by 100ms
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Stop observing once animation is triggered (performance optimization)
                observer.unobserve(entry.target);
            }
        });
    }
    
    // Create intersection observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* 
==================================================
FORM VALIDATION
==================================================
*/

/**
 * Initialize form validation for the contact/application form
 */
function initializeFormValidation() {
    const form = document.getElementById('consultationForm') || document.getElementById('applicationForm');
    if (!form) return;
    
    // Get form elements
    const passwordInput = document.getElementById('pword');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const submitButton = form.querySelector('.btn-primary');
    
    /**
     * Validate password fields in real-time
     */
    function validatePasswords() {
        const password = passwordInput?.value || '';
        const confirmPassword = confirmPasswordInput?.value || '';
        
        // Check if passwords match
        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity('Passwords do not match');
            confirmPasswordInput.style.borderColor = '#e74c3c'; // Red border for error
        } else {
            confirmPasswordInput.setCustomValidity('');
            confirmPasswordInput.style.borderColor = ''; // Reset to default
        }
    }
    
    /**
     * Show loading state on form submission
     * @param {boolean} isLoading - Whether form is in loading state
     */
    function toggleLoadingState(isLoading) {
        if (!submitButton) return;
        
        if (isLoading) {
            submitButton.innerHTML = 'Submitting...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
        } else {
            const buttonText = form.id === 'consultationForm' ? 'Request Free Consultation' : 'Submit Application';
            submitButton.innerHTML = buttonText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }
    }
    
    /**
     * Display notification to user
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, info)
     */
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set notification content
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 6px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                z-index: 9999;
                max-width: 350px;
                font-family: var(--font-primary);
            ">
                <span style="margin-right: 0.5rem;">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                ${message}
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="
                            background: none;
                            border: none;
                            color: white;
                            font-size: 1.2rem;
                            cursor: pointer;
                            float: right;
                            padding: 0;
                            margin-left: 1rem;
                        ">&times;</button>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
    
    // Add event listeners for password validation
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', validatePasswords);
        confirmPasswordInput.addEventListener('input', validatePasswords);
    }
    
    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate passwords if they exist
        if (passwordInput && confirmPasswordInput) {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (password.length < 8) {
                showNotification('Password must be at least 8 characters long!', 'error');
                return;
            }
        }
        
        // Show loading state
        toggleLoadingState(true);
        
        // Simulate API call (replace with actual submission logic)
        setTimeout(() => {
            toggleLoadingState(false);
            const successMessage = form.id === 'consultationForm' 
                ? 'Consultation request submitted successfully! Our team will contact you within 24 hours.' 
                : 'Application submitted successfully! We\'ll be in touch soon.';
            showNotification(successMessage, 'success');
            form.reset(); // Clear form
        }, 2000); // 2 second delay to simulate processing
    }
    
    // Add form submit event listener
    form.addEventListener('submit', handleFormSubmit);
}

/* 
==================================================
SMOOTH SCROLLING
==================================================
*/

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    // Handle clicks on anchor links (links that start with #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset to account for fixed navigation
                const navHeight = document.querySelector('.topnav')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll to top of page (for potential "back to top" button)
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* 
==================================================
ACCESSIBILITY FEATURES
==================================================
*/

/**
 * Initialize accessibility enhancements
 */
function initializeAccessibility() {
    // Keyboard navigation support
    document.addEventListener('keydown', function(event) {
        // Add class when user navigates with keyboard
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse interaction
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Skip to main content link for screen readers
    addSkipLink();
}

/**
 * Add skip to main content link for accessibility
 */
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    // Style the skip link
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    // Show skip link when focused
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    // Hide skip link when focus is lost
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    // Add to document
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/* 
==================================================
UTILITY FUNCTIONS
==================================================
*/

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} - Whether element is visible
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Throttle function calls for better performance
 * @param {Function} func - Function to throttle
 * @param {number} wait - Time to wait between calls
 * @returns {Function} - Throttled function
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Time to wait before execution
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* 
==================================================
ERROR HANDLING
==================================================
*/

/**
 * Global error handler for better user experience
 */
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // In production, you might want to send this to an error reporting service
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // Prevent the default behavior (logging to console)
    event.preventDefault();
});

/* 
==================================================
DEVELOPMENT HELPERS
==================================================
*/

// Only run in development environment
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Development mode active');
    
    // Add helpful console messages
    console.log('📝 Available functions:');
    console.log('- scrollToTop(): Scroll to top of page');
    console.log('- isElementInViewport(element): Check if element is visible');
}

/* 
==================================================
END OF SCRIPT
==================================================
*/