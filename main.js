/**
 * SASIGLOBAL Core Interactions
 * Managed by the "Elite Enterprise" Orchestration System.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initPagination();
    initMouseFollow();
    initContactForm();
    initGISMap();
    
    // Header-dependent initialization
    window.addEventListener('headerLoaded', () => {
        initHeaderScroll();
    });
});

/**
 * Scroll-driven reveal animations (global across all pages)
 * Uses IntersectionObserver to animate elements as they enter the viewport.
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger children with .scroll-child
                const children = entry.target.querySelectorAll('.scroll-child');
                children.forEach((child, i) => {
                    child.style.transitionDelay = `${i * 120}ms`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    // Observe everything with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Auto-tag common elements for scroll animation
    document.querySelectorAll('section').forEach(section => {
        if (!section.classList.contains('scroll-reveal')) {
            section.classList.add('scroll-reveal');
        }
        observer.observe(section);
    });

    // Legacy support for reveal-text
    document.querySelectorAll('.reveal-text').forEach(el => {
        if (!el.classList.contains('scroll-reveal')) {
            el.classList.add('scroll-reveal');
        }
        observer.observe(el);
    });

    // Glass panels
    document.querySelectorAll('.glass-panel').forEach(el => {
        if (!el.classList.contains('scroll-reveal')) {
            el.classList.add('scroll-reveal');
        }
        observer.observe(el);
    });
}

/**
 * Initialize Vertical Pagination Dots
 */
function initPagination() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const existingNav = document.querySelector('.pagination-dots');
    if (existingNav) existingNav.remove();

    const nav = document.createElement('div');
    nav.className = 'pagination-dots hidden lg:flex';
    
    sections.forEach(section => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        const label = section.getAttribute('data-title') || section.id.charAt(0).toUpperCase() + section.id.slice(1);
        dot.setAttribute('data-label', label);
        
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        nav.appendChild(dot);
    });

    document.body.appendChild(nav);

    const updateActiveDot = () => {
        let current = '';
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        const dots = document.querySelectorAll('.dot');
        sections.forEach((section, index) => {
            if (dots[index]) {
                dots[index].classList.toggle('active', section.getAttribute('id') === current);
            }
        });
    };

    window.addEventListener('scroll', updateActiveDot);
    updateActiveDot();
}

/**
 * Header background opacity on scroll
 */
function initHeaderScroll() {
    const nav = document.querySelector('#main-nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('py-4', 'bg-slate-900/98', 'backdrop-blur-3xl', 'shadow-2xl');
            nav.classList.remove('py-8', 'bg-slate-900/95', 'backdrop-blur-xl');
        } else {
            nav.classList.add('py-8', 'bg-slate-900/95', 'backdrop-blur-xl');
            nav.classList.remove('py-4', 'bg-slate-900/98', 'backdrop-blur-3xl', 'shadow-2xl');
        }
    });
}

/**
 * Interactive Background Effect
 */
function initMouseFollow() {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.body.style.setProperty('--mouse-x', `${x}%`);
        document.body.style.setProperty('--mouse-y', `${y}%`);
    });
}

/**
 * Contact Form with Corporate Welcome Popup
 * Handles form submission, shows an elegant confirmation overlay,
 * and simulates sending the presentation letter via email.
 */
function initContactForm() {
    const form = document.querySelector('#contacto form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');
        const clientName = nameInput ? nameInput.value.trim() : '';
        const clientEmail = emailInput ? emailInput.value.trim() : '';

        if (!clientName || !clientEmail) {
            // Shake the button
            const btn = form.querySelector('button');
            btn.style.animation = 'shake 0.4s ease';
            setTimeout(() => btn.style.animation = '', 400);
            return;
        }

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.innerHTML = `
            <div class="popup-card">
                <div class="popup-icon">
                    <span class="material-symbols-outlined">verified</span>
                </div>
                <h3 class="popup-title">Solicitud Recibida</h3>
                <div class="popup-divider"></div>
                <p class="popup-body">
                    Estimado/a <strong>${clientName}</strong>, agradecemos profundamente su confianza 
                    en <strong>SASIGLOBAL SAS</strong>.
                </p>
                <p class="popup-body popup-body-sm">
                    Nuestra Carta de Presentación Corporativa y un mensaje de bienvenida 
                    han sido enviados a <strong>${clientEmail}</strong>.
                </p>
                <p class="popup-body popup-body-sm">
                    Un asesor de nuestro equipo ejecutivo se pondrá en contacto con usted 
                    en las próximas 24 horas hábiles para atender su requerimiento.
                </p>
                <div class="popup-footer">
                    <span class="popup-brand">SASI<span>GLOBAL</span> Engineering</span>
                </div>
                <button class="popup-close" onclick="this.closest('.popup-overlay').remove()">
                    ENTENDIDO
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(() => {
            overlay.classList.add('popup-visible');
        });

        // Reset form
        form.reset();
    });
}
