// Validación y funcionalidad del formulario de contacto
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.querySelector('.form-submit-btn');
        this.successMessage = document.querySelector('.form-success');
        this.formSection = document.querySelector('.contact-form-section');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.setupEventListeners();
        this.setupRealTimeValidation();
    }
    
    setupEventListeners() {
        // Envío del formulario
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Validación en tiempo real
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    setupRealTimeValidation() {
        // Validación del teléfono en tiempo real
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                // Permitir solo números, espacios, guiones y paréntesis
                e.target.value = e.target.value.replace(/[^0-9\s\-\(\)\+]/g, '');
            });
        }
        
        // Validación del email en tiempo real
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                // Convertir a minúsculas
                e.target.value = e.target.value.toLowerCase();
            });
        }
    }
    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Limpiar errores previos
        this.clearError(field);
        
        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'El nombre es obligatorio';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                    isValid = false;
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                    errorMessage = 'El nombre solo puede contener letras y espacios';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!value) {
                    errorMessage = 'El email es obligatorio';
                    isValid = false;
                } else if (!this.isValidEmail(value)) {
                    errorMessage = 'Por favor ingresa un email válido';
                    isValid = false;
                }
                break;
                
            case 'phone':
                if (!value) {
                    errorMessage = 'El teléfono es obligatorio';
                    isValid = false;
                } else if (!this.isValidPhone(value)) {
                    errorMessage = 'Por favor ingresa un teléfono válido (ej: +56 9 1234 5678)';
                    isValid = false;
                }
                break;
                
            case 'subject':
                if (!value) {
                    errorMessage = 'Por favor selecciona un asunto';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (!value) {
                    errorMessage = 'El mensaje es obligatorio';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                    isValid = false;
                } else if (value.length > 1000) {
                    errorMessage = 'El mensaje no puede exceder 1000 caracteres';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        // Remover espacios, guiones y paréntesis para validación
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        
        // Validar formato chileno: +56 9 XXXX XXXX o 9 XXXX XXXX
        const phoneRegex = /^(\+?56)?\s?9\s?\d{4}\s?\d{4}$|^9\d{8}$/;
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 9;
    }
    
    showError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    validateForm() {
        const fields = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    async handleSubmit() {
        // Validar formulario
        if (!this.validateForm()) {
            this.showFormError('Por favor corrige los errores antes de enviar');
            return;
        }
        
        // Mostrar estado de carga
        this.setLoadingState(true);
        
        try {
            // Simular envío del formulario (aquí se integraría con el backend)
            await this.simulateFormSubmission();
            
            // Mostrar mensaje de éxito
            this.showSuccess();
            
            // Limpiar formulario
            this.form.reset();
            
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            this.showFormError('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    async simulateFormSubmission() {
        // Envío real al servidor usando fetch
        const formData = new FormData(this.form);
        
        try {
            const response = await fetch('enviar.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.text();
            
            if (response.ok && result.includes('éxito')) {
                return Promise.resolve();
            } else {
                throw new Error(result || 'Error al enviar el correo');
            }
        } catch (error) {
            throw new Error('Error de conexión: ' + error.message);
        }
    }
    
    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = `
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" class="animate-spin"/>
                </svg>
                Enviando...
            `;
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = `
                Enviar Mensaje
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
            `;
        }
    }
    
    showSuccess() {
        // Ocultar formulario y mostrar mensaje de éxito
        this.form.style.display = 'none';
        this.successMessage.classList.add('show');
        
        // Scroll suave al mensaje de éxito
        this.successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Volver a mostrar el formulario después de 5 segundos
        setTimeout(() => {
            this.hideSuccess();
        }, 5000);
    }
    
    hideSuccess() {
        this.successMessage.classList.remove('show');
        this.form.style.display = 'flex';
    }
    
    showFormError(message) {
        // Crear o actualizar mensaje de error general
        let errorDiv = this.formSection.querySelector('.form-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.cssText = `
                background: rgba(220, 53, 69, 0.1);
                border: 2px solid rgba(220, 53, 69, 0.2);
                color: #dc3545;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                text-align: center;
                font-weight: 500;
            `;
            this.form.parentNode.insertBefore(errorDiv, this.form);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        }, 5000);
        
        // Scroll al error
        errorDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Funcionalidad adicional para WhatsApp
class WhatsAppIntegration {
    constructor() {
        this.whatsappBtn = document.querySelector('.whatsapp-btn');
        this.init();
    }
    
    init() {
        if (!this.whatsappBtn) return;
        
        this.whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openWhatsApp();
        });
    }
    
    openWhatsApp() {
        // Número de WhatsApp del salón (reemplazar con el número real)
        const phoneNumber = '56912345678'; // Formato: código país + número sin +
        
        // Mensaje predeterminado
        const message = encodeURIComponent(
            '¡Hola! Me gustaría agendar una cita en TopHair. ¿Podrían ayudarme con la disponibilidad?'
        );
        
        // URL de WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Analytics (opcional)
        this.trackWhatsAppClick();
    }
    
    trackWhatsAppClick() {
        // Aquí se puede integrar con Google Analytics o similar
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                event_category: 'contact',
                event_label: 'whatsapp_button'
            });
        }
    }
}

// Animaciones de entrada para elementos de contacto
class ContactAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, options);
        
        // Observar elementos animados
        const animatedElements = document.querySelectorAll(
            '.contact-header, .contact-form-section, .contact-info-section, .location-card, .general-info, .whatsapp-cta'
        );
        
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    new WhatsAppIntegration();
    new ContactAnimations();
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ContactForm,
        WhatsAppIntegration,
        ContactAnimations
    };
}