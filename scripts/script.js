// Modern JavaScript with Enhanced Features
document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================
    // NAVBAR SCROLL EFFECTS
    // =====================================
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for blur effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // =====================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // =====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =====================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // =====================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('team-member') || 
                    entry.target.classList.contains('vision-card')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // =====================================
    // PARALLAX EFFECTS
    // =====================================
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Hero section parallax
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                const speed = 0.3;
                const yPos = scrolled * speed;
                heroContent.style.transform = `translateY(${yPos}px)`;
            }
        }
    }

    // Throttled parallax for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', function() {
        requestTick();
        ticking = false;
    });

    // =====================================
    // DYNAMIC TYPING EFFECT
    // =====================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect to hero title after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1000);

    // =====================================
    // FORM ENHANCEMENTS
    // =====================================
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        // Form validation and submission
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            const password = document.getElementById('pword').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (password.length < 8) {
                showNotification('Password must be at least 8 characters long!', 'error');
                return;
            }
            
            // Simulate form submission
            showLoadingState(true);
            
            setTimeout(() => {
                showLoadingState(false);
                showNotification('Application submitted successfully! We\'ll be in touch soon.', 'success');
                this.reset();
            }, 2000);
        });

        // Real-time password validation
        const passwordInput = document.getElementById('pword');
        const confirmPasswordInput = document.getElementById('confirm-password');
        
        function validatePasswords() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (confirmPassword && password !== confirmPassword) {
                confirmPasswordInput.setCustomValidity('Passwords do not match');
                confirmPasswordInput.style.borderColor = 'var(--secondary-color)';
            } else {
                confirmPasswordInput.setCustomValidity('');
                confirmPasswordInput.style.borderColor = '#e2e8f0';
            }
        }
        
        passwordInput.addEventListener('input', validatePasswords);
        confirmPasswordInput.addEventListener('input', validatePasswords);
    }

    // =====================================
    // LOADING STATE MANAGEMENT
    // =====================================
    function showLoadingState(isLoading) {
        const submitButton = document.querySelector('.btn-primary');
        if (submitButton) {
            if (isLoading) {
                submitButton.innerHTML = '<span class="loading-spinner"></span> Submitting...';
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
            } else {
                submitButton.innerHTML = 'Submit Application';
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }
        }
    }

    // =====================================
    // NOTIFICATION SYSTEM
    // =====================================
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--card-shadow);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => closeNotification(notification));
        
        // Auto close after 5 seconds
        setTimeout(() => closeNotification(notification), 5000);
    }
    
    function closeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }
    
    function getNotificationColor(type) {
        const colors = {
            success: 'var(--primary-gradient)',
            error: 'var(--secondary-gradient)',
            warning: '#f59e0b',
            info: 'var(--accent-gradient)'
        };
        return colors[type] || colors.info;
    }

    // =====================================
    // CARD HOVER EFFECTS
    // =====================================
    document.querySelectorAll('.card, .team-member, .vision-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // =====================================
    // ENHANCED CAROUSEL CONTROLS
    // =====================================
    const carousel = document.querySelector('#techaraCarousel');
    if (carousel) {
        // Auto-pause on hover
        carousel.addEventListener('mouseenter', function() {
            const carouselInstance = bootstrap.Carousel.getInstance(this);
            if (carouselInstance) {
                carouselInstance.pause();
            }
        });
        
        carousel.addEventListener('mouseleave', function() {
            const carouselInstance = bootstrap.Carousel.getInstance(this);
            if (carouselInstance) {
                carouselInstance.cycle();
            }
        });
    }

    // =====================================
    // SKEUOMORPHIC BUTTON EFFECTS
    // =====================================
    document.querySelectorAll('.btn-primary, .topnav a').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });

    // =====================================
    // PERFORMANCE OPTIMIZATIONS
    // =====================================
    
    // Lazy load images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });

    // =====================================
    // ACCESSIBILITY ENHANCEMENTS
    // =====================================
    
    // Focus management for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // =====================================
    // DYNAMIC COLOR THEME
    // =====================================
    function updateThemeColors() {
        const hour = new Date().getHours();
        const root = document.documentElement;
        
        // Subtle theme changes based on time of day
        if (hour >= 18 || hour <= 6) {
            // Evening/Night theme - slightly warmer
            root.style.setProperty('--primary-color', '#7c3aed');
            root.style.setProperty('--background-light', '#f8fafc');
        } else if (hour >= 12 && hour < 18) {
            // Afternoon theme - more vibrant
            root.style.setProperty('--primary-color', '#667eea');
            root.style.setProperty('--background-light', '#f8fafc');
        } else {
            // Morning theme - fresh and bright
            root.style.setProperty('--primary-color', '#10b981');
            root.style.setProperty('--background-light', '#f0fdf4');
        }
    }
    
    // Apply theme on load
    updateThemeColors();

    // =====================================
    // SCROLL PROGRESS INDICATOR
    // =====================================
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / documentHeight) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        });
    }

    // =====================================
    // EASTER EGG: KONAMI CODE
    // =====================================
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
    
    function activateEasterEgg() {
        // Create celebratory animation
        const colors = ['#667eea', '#f5576c', '#00f2fe', '#ffd700', '#ff6b6b'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
        
        showNotification('🎉 Konami Code activated! Welcome to the secret tech club!', 'success');
    }
    
    function createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${color};
            top: -10px;
            left: ${Math.random() * window.innerWidth}px;
            z-index: 9999;
            border-radius: 50%;
            pointer-events: none;
            animation: confetti-fall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 3000);
    }
    
    // Add confetti animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confetti-fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(${window.innerHeight + 10}px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 2px solid white;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
        
        .notification-close:hover {
            opacity: 0.7;
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Techara website enhanced with modern JavaScript features!');
    console.log('💡 Try the Konami Code: ↑↑↓↓←→←→BA for a surprise!');
});

// =====================================
// GLOBAL FUNCTIONS
// =====================================

// Scroll to top function for FAB
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}