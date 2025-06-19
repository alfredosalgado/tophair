// ===== FUNCIONALIDAD SECCIÓN SERVICIOS =====

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initServices();
});

// Función principal de inicialización
function initServices() {
    setupIntersectionObserver();
    setupCardInteractions();
    setupContactButtons();
    setupScrollAnimations();
    setupServiceCounters();
    setupParallaxEffect();
    setupMobileOptimizations();
}

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animar cards con delay escalonado
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementsToObserve = [
        '.services-header',
        '.service-card',
        '.services-cta'
    ];

    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));
    });
}

// ===== INTERACCIONES DE CARDS =====
function setupCardInteractions() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Animar icono sin afectar su posición
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
            
            // Efecto ripple
            createRippleEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Restaurar icono
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
        
        // Efecto click
        card.addEventListener('click', function(e) {
            // Evitar el ripple si se hace clic en el botón de contacto
            if (e.target.closest('.service-contact-btn')) {
                return;
            }
            
            if (!e.target.closest('a')) {
                createClickEffect(this);
                
                // Scroll suave al contacto después del efecto
                setTimeout(() => {
                    const contactSection = document.querySelector('#contacto');
                    if (contactSection) {
                        contactSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 300);
            }
        });
    });
}

// Configurar botones de contacto
function setupContactButtons() {
    const contactButtons = document.querySelectorAll('.service-contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efecto de pulsación
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Tracking opcional (se puede agregar analytics aquí)
            const serviceName = this.closest('.service-card').querySelector('.service-name').textContent;
            console.log(`Contacto solicitado para: ${serviceName}`);
        });
        
        // Efecto hover mejorado
        button.addEventListener('mouseenter', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ===== EFECTO RIPPLE =====
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'service-ripple';
    
    // Estilos del ripple
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
        z-index: 0;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Remover después de la animación
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// ===== EFECTO CLICK =====
function createClickEffect(element) {
    element.style.transform = 'translateY(-10px) scale(0.98)';
    
    setTimeout(() => {
        element.style.transform = 'translateY(-15px) scale(1.02)';
    }, 150);
}

// ===== ANIMACIONES DE SCROLL =====
function setupScrollAnimations() {
    let ticking = false;
    
    function updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const servicesSection = document.querySelector('.services');
        
        if (servicesSection) {
            const rect = servicesSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                // Efecto parallax sutil en el fondo
                const translateY = scrolled * 0.1;
                servicesSection.style.backgroundPosition = `center ${translateY}px`;
                
                // Animar features con scroll
                animateFeatures(scrolled);
            }
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// ===== ANIMACIÓN DE FEATURES =====
function animateFeatures(scrolled) {
    const features = document.querySelectorAll('.service-feature');
    
    features.forEach((feature, index) => {
        const rect = feature.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const delay = index * 50;
            const translateY = Math.sin(scrolled * 0.01 + index) * 2;
            
            setTimeout(() => {
                feature.style.transform = `translateY(${translateY}px)`;
            }, delay);
        }
    });
}

// ===== CONTADORES ANIMADOS =====
function setupServiceCounters() {
    const serviceCards = document.querySelectorAll('.service-card');
    let countersAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    if (serviceCards.length > 0) {
        observer.observe(serviceCards[0]);
    }
}

function animateCounters() {
    // Simular contadores de servicios (opcional)
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// ===== EFECTO PARALLAX =====
function setupParallaxEffect() {
    const servicesSection = document.querySelector('.services');
    if (!servicesSection) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rect = servicesSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            // Efecto parallax sutil solo en el fondo de la sección
            const translateY = scrolled * 0.1;
            servicesSection.style.backgroundPosition = `center ${translateY}px`;
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
}

// ===== OPTIMIZACIONES MÓVILES =====
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Desactivar algunos efectos en móviles para mejor rendimiento
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Simplificar interacciones en móvil
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            }, { passive: true });
        });
        
        // Optimizar scroll en móviles
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Lógica de scroll optimizada para móviles
            }, 100);
        }, { passive: true });
    }
}

// ===== FUNCIONES DE UTILIDAD =====

// Función para smooth scroll mejorado
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Función para detectar si un elemento está visible
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== ESTILOS CSS DINÁMICOS =====

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    .service-card.animate-in {
        animation: fadeInUp 0.6s ease-out both;
    }
    
    .services-header.animate-in {
        animation: fadeInUp 0.8s ease-out both;
    }
    
    .services-cta.animate-in {
        animation: fadeInUp 0.8s ease-out 0.3s both;
    }
`;

document.head.appendChild(style);

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.warn('Error en services.js:', e.message);
});

// ===== CLEANUP AL CAMBIAR DE PÁGINA =====
window.addEventListener('beforeunload', function() {
    // Limpiar event listeners si es necesario
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.style.transform = '';
        card.style.transition = '';
    });
});