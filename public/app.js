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
});

