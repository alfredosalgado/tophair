/* ===== NAVBAR FUNCTIONALITY ===== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener elementos del DOM
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    // Función para toggle del menú hamburguesa
    function toggleMobileMenu() {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navbarMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listener para el botón hamburguesa
    if (navbarToggle) {
        navbarToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Event listeners para cerrar el menú al hacer clic en un enlace
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Cerrar menú móvil si está abierto
            if (navbarMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            
            // Remover clase active de todos los enlaces
            navbarLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
        });
    });
    
    // Cerrar menú móvil al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbarToggle.contains(event.target) || navbarMenu.contains(event.target);
        
        if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Cerrar menú móvil al redimensionar la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 480 && navbarMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Función para manejar el scroll y el efecto sticky
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar sombra cuando se hace scroll
        if (scrollTop > 0) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Función para destacar el enlace activo basado en la sección visible
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remover active de todos los enlaces
                navbarLinks.forEach(link => link.classList.remove('active'));
                
                // Agregar active al enlace correspondiente
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Event listener para el scroll (destacar sección activa)
    window.addEventListener('scroll', highlightActiveSection);
    
    // Smooth scroll para los enlaces internos
    navbarLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Altura de la navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    console.log('Navbar functionality loaded successfully');
});