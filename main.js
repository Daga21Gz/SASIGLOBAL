document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    initPagination();
    initMobileMenu();
    initHeaderScroll();
    initMouseFollow();
    initActiveNavLink();
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

    // Remove existing pagination if any
    const existingNav = document.querySelector('.pagination-dots');
    if (existingNav) existingNav.remove();

    // Create pagination container
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

    // Update active dot on scroll
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
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('#mobile-menu-btn');
    const menu = document.querySelector('#mobile-menu');
    const closeBtn = document.querySelector('#close-menu');
    
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            document.body.style.overflow = '';
        });
    }

    // Close on link click
    menu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            document.body.style.overflow = '';
        });
    });
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
 * Set active class on nav link based on current page
 */
function initActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop Nav
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile Nav
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('text-primary-container');
        } else {
            link.classList.remove('text-primary-container');
        }
    });
}
