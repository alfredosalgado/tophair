// ===== GALERÍA FUNCIONALIDAD =====

class Gallery {
    constructor() {
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupModal();
        this.setupLazyLoading();
        this.setupAnimations();
    }

    // Funcionalidad simplificada para galería del salón
    setupFilterButtons() {
        // Funcionalidad simplificada para galería del salón
    // Ya no necesitamos filtros porque solo mostramos fotos del salón
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Aplicar animación de entrada a todas las imágenes
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease forwards';
    });

    // Funcionalidad para mostrar más fotos en móvil
    this.setupShowMoreButton();
    }

    // Filtrar elementos de la galería
    filterItems(items, filter) {
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.classList.add('visible');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                item.classList.remove('visible');
                item.classList.add('hidden');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Configurar botón "Ver más fotos" para móvil
    setupShowMoreButton() {
        const showMoreBtn = document.getElementById('showMoreBtn');
        if (!showMoreBtn) return;

        showMoreBtn.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.gallery-item:nth-child(n+4):not(.show)');
            
            hiddenItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
            });

            // Ocultar el botón después de mostrar todas las fotos
            showMoreBtn.classList.add('hidden');
        });
    }

    // Configurar modal de zoom
    setupModal() {
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.modal-close');
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');
        const zoomButtons = document.querySelectorAll('.gallery-zoom');
        
        let currentImageIndex = 0;
        let images = [];

        // Recopilar todas las imágenes
        this.updateImagesList = () => {
            const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
            images = Array.from(visibleItems).map(item => {
                const img = item.querySelector('img');
                return {
                    src: img.src,
                    alt: img.alt
                };
            });
        };

        // Abrir modal
        zoomButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.updateImagesList();
                
                const imageSrc = button.getAttribute('data-image');
                currentImageIndex = images.findIndex(img => img.src.includes(imageSrc.split('/').pop()));
                
                if (currentImageIndex === -1) currentImageIndex = 0;
                
                this.showModal(modal, modalImage, images[currentImageIndex]);
            });
        });

        // Cerrar modal
        closeBtn.addEventListener('click', () => {
            this.hideModal(modal);
        });

        // Cerrar modal al hacer clic fuera de la imagen
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideModal(modal);
            }
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.hideModal(modal);
                        break;
                    case 'ArrowLeft':
                        this.showPreviousImage(modalImage, images, currentImageIndex);
                        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
                        break;
                    case 'ArrowRight':
                        this.showNextImage(modalImage, images, currentImageIndex);
                        currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
                        break;
                }
            }
        });

        // Botón anterior
        prevBtn.addEventListener('click', () => {
            this.showPreviousImage(modalImage, images, currentImageIndex);
            currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
        });

        // Botón siguiente
        nextBtn.addEventListener('click', () => {
            this.showNextImage(modalImage, images, currentImageIndex);
            currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
        });
    }

    // Mostrar modal
    showModal(modal, modalImage, imageData) {
        modalImage.src = imageData.src;
        modalImage.alt = imageData.alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Ocultar modal
    hideModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Mostrar imagen anterior
    showPreviousImage(modalImage, images, currentIndex) {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        modalImage.style.opacity = '0';
        setTimeout(() => {
            modalImage.src = images[prevIndex].src;
            modalImage.alt = images[prevIndex].alt;
            modalImage.style.opacity = '1';
        }, 150);
    }

    // Mostrar imagen siguiente
    showNextImage(modalImage, images, currentIndex) {
        const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        modalImage.style.opacity = '0';
        setTimeout(() => {
            modalImage.src = images[nextIndex].src;
            modalImage.alt = images[nextIndex].alt;
            modalImage.style.opacity = '1';
        }, 150);
    }

    // Configurar lazy loading para las imágenes
    setupLazyLoading() {
        const images = document.querySelectorAll('.gallery-image img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Configurar animaciones de entrada
    setupAnimations() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            itemObserver.observe(item);
        });
    }

    // Método para agregar nuevas imágenes dinámicamente
    addImage(imageSrc, category, title, description) {
        const galleryGrid = document.querySelector('.gallery-grid');
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item visible';
        galleryItem.setAttribute('data-category', category);
        
        galleryItem.innerHTML = `
            <div class="gallery-image">
                <img src="${imageSrc}" alt="${title}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                    <button class="gallery-zoom" data-image="${imageSrc}">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
        
        // Reconfigurar eventos para el nuevo elemento
        this.setupModal();
        this.setupLazyLoading();
    }

    // Método para actualizar el filtro activo
    updateActiveFilter(filter) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });
        
        this.filterItems(galleryItems, filter);
    }
}

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si existe la sección de galería
    if (document.querySelector('.gallery-section')) {
        new Gallery();
    }
});

// Exportar la clase para uso externo si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
}