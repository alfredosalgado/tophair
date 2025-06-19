/* ===== FOOTER JAVASCRIPT ===== */

// Inicialización del Footer
document.addEventListener('DOMContentLoaded', function() {
    initFooter();
});

function initFooter() {
    // Configurar enlaces de navegación
    setupFooterNavigation();
    
    // Configurar enlaces de contacto
    setupContactLinks();
    
    // Configurar animaciones de scroll
    setupScrollAnimations();
    
    // Configurar año dinámico en copyright
    updateCopyrightYear();
    
    // Configurar efectos hover
    setupHoverEffects();
}

// Configurar navegación del footer
function setupFooterNavigation() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si es un enlace interno (comienza con #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll suave al elemento
                    const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fijo
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar URL sin recargar página
                    history.pushState(null, null, href);
                }
            }
            // Para enlaces externos (como index.html), dejar comportamiento normal
        });
    });
}

// Configurar enlaces de contacto
function setupContactLinks() {
    // Enlaces de teléfono
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics o tracking si es necesario
            console.log('Llamada telefónica iniciada:', this.href);
        });
    });
    
    // Enlaces de email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics o tracking si es necesario
            console.log('Email iniciado:', this.href);
        });
    });
    
    // Enlaces de redes sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics o tracking si es necesario
            console.log('Red social visitada:', this.href);
        });
    });
}

// Configurar animaciones de scroll
function setupScrollAnimations() {
    // Crear observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar columnas del footer
    const footerColumns = document.querySelectorAll('.footer-column');
    footerColumns.forEach(column => {
        observer.observe(column);
    });
}

// Actualizar año en copyright
function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.footer-copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        const copyrightText = copyrightElement.textContent;
        
        // Reemplazar cualquier año de 4 dígitos con el año actual
        const updatedText = copyrightText.replace(/\d{4}/, currentYear);
        copyrightElement.textContent = updatedText;
    }
}

// Configurar efectos hover adicionales
function setupHoverEffects() {
    // Efecto parallax sutil en el footer
    window.addEventListener('scroll', function() {
        const footer = document.querySelector('.footer');
        if (!footer) return;
        
        const scrolled = window.pageYOffset;
        const footerTop = footer.offsetTop;
        const windowHeight = window.innerHeight;
        
        // Solo aplicar efecto cuando el footer está visible
        if (scrolled + windowHeight > footerTop) {
            const rate = (scrolled + windowHeight - footerTop) / windowHeight;
            const yPos = -(rate * 20); // Movimiento sutil
            
            footer.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    // Efecto de brillo en el logo
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) {
        footerLogo.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))';
        });
        
        footerLogo.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    }
    
    // Efecto de ondas en los enlaces
    const footerLinks = document.querySelectorAll('.footer-links a, .social-link');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 5px rgba(212, 175, 55, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
}

// Función para mostrar/ocultar información adicional en móvil
function toggleMobileInfo() {
    const footerColumns = document.querySelectorAll('.footer-column');
    
    footerColumns.forEach((column, index) => {
        if (index > 0) { // Mantener siempre visible la primera columna (logo)
            const title = column.querySelector('.footer-title');
            const content = column.querySelector('.footer-links, .footer-contact, .footer-social');
            
            if (title && content && window.innerWidth <= 768) {
                title.style.cursor = 'pointer';
                title.addEventListener('click', function() {
                    const isVisible = content.style.display !== 'none';
                    content.style.display = isVisible ? 'none' : 'flex';
                    
                    // Rotar icono si existe
                    const icon = title.querySelector('.toggle-icon');
                    if (icon) {
                        icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
                    }
                });
            }
        }
    });
}

// Función de utilidad para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función de utilidad para formatear números de teléfono
function formatPhoneNumber(phone) {
    // Remover caracteres no numéricos excepto +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Formatear número chileno
    if (cleaned.startsWith('+569')) {
        return `+569 ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
    }
    
    return phone;
}

// Exportar funciones para uso externo si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFooter,
        setupFooterNavigation,
        setupContactLinks,
        isValidEmail,
        formatPhoneNumber
    };
}

// Reinicializar en cambio de tamaño de ventana
window.addEventListener('resize', function() {
    // Reconfigurar efectos móviles
    if (window.innerWidth <= 768) {
        toggleMobileInfo();
    }
});

// Configuración inicial para móviles
if (window.innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(toggleMobileInfo, 100);
    });
}