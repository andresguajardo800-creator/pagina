/**
 * Velofibra - Funcionalidad Web & Interactividad
 * Versión: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Número oficial de WhatsApp de Velofibra
    const PHONE_NUMBER = '56965840930';

    // 2. Navegación Suave (Smooth Scroll) para enlaces con ancla (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 3. Función auxiliar para enviar mensajes a WhatsApp
    window.openWhatsApp = function (customMessage) {
        const encodedMessage = encodeURIComponent(customMessage || 'Hola, deseo solicitar información sobre los servicios de Velofibra.');
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    // 4. Asignación dinámica a botones con atributo "data-plan"
    const planButtons = document.querySelectorAll('[data-plan]');
    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const planName = button.getAttribute('data-plan');
            const planPrice = button.getAttribute('data-price') || '';
            
            let message = `Hola, quiero consultar por el ${planName}`;
            if (planPrice) {
                message += ` por ${planPrice}`;
            }
            
            window.openWhatsApp(message);
        });
    });

    // 5. Animación sutil de hover / entrada en las tarjetas de planes
    const cards = document.querySelectorAll('.card-plan-hover');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observer.observe(card);
        });
    }
});
