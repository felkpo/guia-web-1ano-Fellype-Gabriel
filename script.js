// Função para verificar autenticação
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Função para navegação suave
function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Highlight da seção atual durante scroll
function setupScrollHighlight() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Inicialização quando o documento carrega
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página principal
    if (window.location.href.includes('main.html')) {
        setupSmoothScroll();
        setupScrollHighlight();
        checkAuth();
        
        // Adiciona estilo para link ativo
        const style = document.createElement('style');
        style.textContent = `
            nav a.active {
                background-color: var(--secondary-color);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Verifica se estamos na página de login
    if (window.location.href.includes('login.html')) {
        const loginButton = document.querySelector('.enter-button');
        if (loginButton) {
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.setItem('isAuthenticated', 'true');
                window.location.href = 'main.html';
            });
        }
    }
});
