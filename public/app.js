// Función para verificar el estado del servicio
async function checkStatus() {
    const statusElement = document.getElementById('status');
    
    try {
        const response = await fetch('/api/health');
        
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const data = await response.json();
        
        statusElement.innerHTML = `
            <span class="status-ok">
                ✅ ${data.message}
            </span>
            <br><br>
            <small>Última verificación: ${new Date(data.timestamp).toLocaleString('es-ES')}</small>
        `;
    } catch (error) {
        statusElement.innerHTML = `
            <span class="status-error">
                ❌ Error: No se pudo conectar al servidor
            </span>
        `;
        console.error('Error al verificar el estado:', error);
    }
}

// Verificar estado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    checkStatus();
    
    // Actualizar cada 30 segundos
    setInterval(checkStatus, 30000);
});

// Agregar animación de entrada a las cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            entry.target.style.transition = 'opacity 0.6s, transform 0.6s';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, observerOptions);

// Observar todas las cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.info-card');
    cards.forEach(card => observer.observe(card));

    // Inicializar calculadora
    initCalculator();
});

// Funcionalidad de la Calculadora
function initCalculator() {
    const calculatorIcon = document.getElementById('calculator-icon');
    const calculatorModal = document.getElementById('calculator-modal');
    const closeCalculator = document.getElementById('close-calculator');
    const calculateBtn = document.getElementById('calculate-btn');
    const appInstances = document.getElementById('app-instances');
    const vmInstances = document.getElementById('vm-instances');
    const totalCost = document.getElementById('total-cost');

    // Precios por servicio (en USD/mes)
    const APP_SERVICE_PRICE = 54.75;
    const VM_PRICE = 137.24;

    // Abrir calculadora
    calculatorIcon.addEventListener('click', () => {
        calculatorModal.classList.remove('hidden');
        updateTotal(); // Calcular total inicial
    });

    // Cerrar calculadora
    closeCalculator.addEventListener('click', () => {
        calculatorModal.classList.add('hidden');
    });

    // Cerrar al hacer clic fuera del modal
    calculatorModal.addEventListener('click', (e) => {
        if (e.target === calculatorModal) {
            calculatorModal.classList.add('hidden');
        }
    });

    // Calcular total al cambiar valores
    [appInstances, vmInstances].forEach(input => {
        input.addEventListener('input', updateTotal);
    });

    // Botón calcular
    calculateBtn.addEventListener('click', () => {
        updateTotal();
        // Animación de confirmación
        calculateBtn.textContent = '✓ ¡Calculado!';
        calculateBtn.style.background = '#4ade80';
        
        // Mostrar notificación flotante con confeti
        showNotification(totalCost.textContent);
        
        setTimeout(() => {
            calculateBtn.textContent = 'Calcular';
            calculateBtn.style.background = '';
        }, 2000);
    });

    // Función para actualizar el total
    function updateTotal() {
        const appCount = parseInt(appInstances.value) || 0;
        const vmCount = parseInt(vmInstances.value) || 0;
        
        const appCost = appCount * APP_SERVICE_PRICE;
        const vmCost = vmCount * VM_PRICE;
        const total = appCost + vmCost;
        
        totalCost.textContent = `$${total.toFixed(2)}`;
    }

    // Función para mostrar notificación con confeti
    function showNotification(priceText) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="emoji">🎉</div>
            <h3>¡Precio Calculado!</h3>
            <div class="price-text">${priceText}</div>
            <p style="margin-top: 15px; font-size: 1.1em;">Costo mensual estimado</p>
        `;
        document.body.appendChild(notification);

        // Crear confeti
        createConfetti();

        // Ocultar notificación después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'popIn 0.3s reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Función para crear confeti
    function createConfetti() {
        const confettiCount = 50;
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '1999';

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 1 + 2.5) + 's';
            confettiContainer.appendChild(confetti);
        }

        document.body.appendChild(confettiContainer);

        // Remover confeti después de la animación
        setTimeout(() => {
            confettiContainer.remove();
        }, 4000);
    }
}

