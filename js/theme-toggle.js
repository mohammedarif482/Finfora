// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create the toggle switch element
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'theme-toggle ms-3';
    toggleContainer.innerHTML = `
        <div class="toggle-circle"></div>
        <i class="fas fa-sun sun-icon"></i>
        <i class="fas fa-moon moon-icon"></i>
    `;
    
    // Replace the existing toggle button with our new toggle
    const existingButton = document.getElementById('themeToggle');
    if (existingButton) {
        existingButton.parentNode.replaceChild(toggleContainer, existingButton);
    } else {
        // If button doesn't exist, add it to the navbar
        const freeQuoteBtn = document.querySelector('.btn.btn-light.rounded-pill');
        if (freeQuoteBtn) {
            freeQuoteBtn.parentNode.insertBefore(toggleContainer, freeQuoteBtn.nextSibling);
        }
    }
    
    // Toggle functionality
    toggleContainer.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save user preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Add smooth transitions for all elements when switching themes
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            }
        </style>
    `);
    
    // Add scroll animations for sections
    const animatedElements = document.querySelectorAll('.service-item, .team-item, .wow');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Enhance buttons with hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-header');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        });
    }
    
    // Add animation for service cards
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            
            // Animate service icon
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            
            // Reset icon animation
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});