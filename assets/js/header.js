/* ===== HEADER JAVASCRIPT ===== */

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
});

/**
 * Función principal de inicialización del header
 */
function initializeHeader() {
    setupParallaxEffect();
    setupSmoothScrolling();
    setupScrollIndicator();
    setupHeaderAnimations();
    setupResponsiveText();
    console.log('Header inicializado correctamente');
}

/**
 * Configura el efecto parallax en la imagen de fondo
 */
function setupParallaxEffect() {
    const headerBgImage = document.querySelector('.header-bg-image');
    
    if (!headerBgImage) return;
    
    // Solo aplicar parallax en pantallas grandes
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            // Aplicar transformación parallax
            headerBgImage.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
        });
    }
}

/**
 * Configura el scroll suave para los enlaces del header
 */
function setupSmoothScrolling() {
    const headerButtons = document.querySelectorAll('.header-btn[href^="#"]');
    
    headerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calcular offset para la navbar fija
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Agregar efecto visual al botón
                addClickEffect(this);
            }
        });
    });
}

/**
 * Configura el comportamiento del indicador de scroll
 */
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    // Ocultar indicador al hacer scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0, 1 - (scrolled / 300));
        
        scrollIndicator.style.opacity = opacity;
        scrollIndicator.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
    });
    
    // Click en el indicador para scroll suave
    scrollIndicator.addEventListener('click', function() {
        const headerHeight = document.querySelector('.header')?.offsetHeight || window.innerHeight;
        
        window.scrollTo({
            top: headerHeight,
            behavior: 'smooth'
        });
    });
}

/**
 * Configura las animaciones del header
 */
function setupHeaderAnimations() {
    const headerText = document.querySelector('.header-text');
    
    if (!headerText) return;
    
    // Observador de intersección para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(headerText);
    
    // Animación escalonada de los elementos
    const animatedElements = headerText.querySelectorAll('.header-title, .header-subtitle, .header-cta');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

/**
 * Ajusta el texto responsivo según el tamaño de pantalla
 */
function setupResponsiveText() {
    const headerTitle = document.querySelector('.header-title');
    const headerSubtitle = document.querySelector('.header-subtitle');
    
    if (!headerTitle || !headerSubtitle) return;
    
    function adjustTextSize() {
        const screenWidth = window.innerWidth;
        
        // Ajustar título
        if (screenWidth <= 320) {
            headerTitle.style.fontSize = '1.8rem';
        } else if (screenWidth <= 480) {
            headerTitle.style.fontSize = '2.2rem';
        } else if (screenWidth <= 768) {
            headerTitle.style.fontSize = '2.8rem';
        } else {
            headerTitle.style.fontSize = '3.5rem';
        }
        
        // Ajustar subtítulo
        if (screenWidth <= 320) {
            headerSubtitle.style.fontSize = '0.9rem';
        } else if (screenWidth <= 480) {
            headerSubtitle.style.fontSize = '1rem';
        } else if (screenWidth <= 768) {
            headerSubtitle.style.fontSize = '1.1rem';
        } else {
            headerSubtitle.style.fontSize = '1.3rem';
        }
    }
    
    // Ajustar al cargar y al redimensionar
    adjustTextSize();
    window.addEventListener('resize', adjustTextSize);
}

/**
 * Agrega efecto visual al hacer click en botones
 */
function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

/**
 * Configura efectos adicionales para mejorar la experiencia
 */
function setupAdditionalEffects() {
    // Efecto de typing en el título (opcional)
    const headerTitle = document.querySelector('.header-title');
    
    if (headerTitle && window.innerWidth > 768) {
        const originalText = headerTitle.innerHTML;
        headerTitle.innerHTML = '';
        
        let index = 0;
        const typingSpeed = 50;
        
        function typeText() {
            if (index < originalText.length) {
                headerTitle.innerHTML += originalText.charAt(index);
                index++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Iniciar typing después de un delay
        setTimeout(typeText, 500);
    }
}

/**
 * Maneja la carga de la imagen de fondo
 */
function handleImageLoading() {
    const headerBgImage = document.querySelector('.header-bg-image');
    
    if (!headerBgImage) return;
    
    // Mostrar loader mientras carga la imagen
    const loader = document.createElement('div');
    loader.className = 'header-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    
    const header = document.querySelector('.header');
    header.appendChild(loader);
    
    // Cuando la imagen se carga completamente
    headerBgImage.addEventListener('load', function() {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    });
    
    // Si hay error al cargar la imagen
    headerBgImage.addEventListener('error', function() {
        console.warn('Error al cargar la imagen del header');
        // Aplicar color de fondo alternativo
        header.style.background = 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)';
        loader.remove();
    });
}

/**
 * Optimiza el rendimiento en dispositivos móviles
 */
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Deshabilitar parallax en móviles para mejor rendimiento
        const headerBgImage = document.querySelector('.header-bg-image');
        if (headerBgImage) {
            headerBgImage.style.transform = 'none';
            headerBgImage.style.transition = 'none';
        }
        
        // Reducir animaciones en móviles
        document.body.classList.add('mobile-optimized');
    }
}

/**
 * Maneja el redimensionamiento de la ventana
 */
window.addEventListener('resize', function() {
    // Debounce para optimizar rendimiento
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        optimizeForMobile();
        setupResponsiveText();
    }, 250);
});

// Inicializar optimizaciones móviles
optimizeForMobile();

// Manejar carga de imagen
handleImageLoading();

/**
 * Función para actualizar dinámicamente el contenido del header
 */
function updateHeaderContent(newTitle, newSubtitle) {
    const headerTitle = document.querySelector('.header-title');
    const headerSubtitle = document.querySelector('.header-subtitle');
    
    if (headerTitle && newTitle) {
        headerTitle.innerHTML = newTitle;
    }
    
    if (headerSubtitle && newSubtitle) {
        headerSubtitle.textContent = newSubtitle;
    }
}

/**
 * Función para agregar eventos personalizados
 */
function addCustomEvents() {
    // Evento personalizado cuando el header es visible
    const header = document.querySelector('.header');
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Disparar evento personalizado
                window.dispatchEvent(new CustomEvent('headerVisible'));
            } else {
                window.dispatchEvent(new CustomEvent('headerHidden'));
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (header) {
        headerObserver.observe(header);
    }
}

// Inicializar eventos personalizados
addCustomEvents();

// Exportar funciones para uso externo si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeHeader,
        updateHeaderContent,
        addClickEffect
    };
}