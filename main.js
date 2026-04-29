/**
 * SASIGLOBAL Core Interactions
 * Managed by the "Elite Enterprise" Orchestration System.
 */

document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    initPagination();
    initMouseFollow();
    
    // Header-dependent initialization
    window.addEventListener('headerLoaded', () => {
        initHeaderScroll();
    });
});

/**
 * Initialize Reveal Animations using Intersection Observer
 */
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .glass-panel, section').forEach(el => {
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
