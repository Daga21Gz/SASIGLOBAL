/**
 * SASIGLOBAL Component Orchestrator
 * Centralizes the VIP Design System components to ensure architectural depth and locality.
 */

const components = {
    navigation: `
    <nav id="main-nav" class="fixed w-full z-50 transition-all duration-500 py-8 px-8">
        <div class="max-w-[1440px] mx-auto flex justify-between items-center">
            <div class="flex items-center gap-4 group cursor-pointer" onclick="window.location.href='index.html'">
                <div class="relative w-12 h-12 flex items-center justify-center bg-white p-1 shadow-[0_0_20px_rgba(220,20,60,0.3)] group-hover:scale-110 transition-transform overflow-hidden">
                    <img src="assets/images/img203.jpg" alt="SASIGLOBAL Logo" class="w-full h-full object-contain">
                </div>
                <div class="flex flex-col leading-none">
                    <span class="font-display text-2xl font-extrabold tracking-[0.2em] text-white uppercase">SASI<span class="text-primary-container">GLOBAL</span></span>
                    <span class="font-tech text-[10px] tracking-[0.5em] text-slate-400 uppercase mt-1">Ingeniería Geoespacial</span>
                </div>
            </div>
            <nav class="hidden lg:flex items-center gap-10 font-display font-medium tracking-[0.15em] uppercase text-[11px]">
                <a class="nav-link" href="index.html">Inicio</a>
                <a class="nav-link" href="solutions.html">Soluciones</a>
                <a class="nav-link" href="operations.html">Operaciones</a>
                <a class="nav-link" href="expertise.html">Experticia</a>
                <a class="nav-link" href="insights.html">Insights</a>
                <a class="nav-link" href="company.html">Empresa</a>
            </nav>
            <div class="flex items-center gap-6">
                <a href="index.html#contacto" class="hidden sm:block border border-primary-container text-primary-container px-8 py-3 font-display text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-primary-container hover:text-white transition-all shadow-[0_5px_15px_rgba(220,20,60,0.1)]">
                    Contactar
                </a>
                <button id="mobile-menu-btn" class="lg:hidden text-white p-2">
                    <span class="material-symbols-outlined">menu</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[60] bg-slate-900/98 backdrop-blur-3xl hidden flex-col items-center justify-center gap-8 animate-fade-in">
        <button id="close-menu" class="absolute top-10 right-10 text-white">
            <span class="material-symbols-outlined text-4xl">close</span>
        </button>
        <div class="flex flex-col items-center gap-8 font-display text-2xl font-bold uppercase tracking-widest text-white">
            <a href="index.html" class="hover:text-primary-container transition-colors">Inicio</a>
            <a href="solutions.html" class="hover:text-primary-container transition-colors">Soluciones</a>
            <a href="operations.html" class="hover:text-primary-container transition-colors">Operaciones</a>
            <a href="expertise.html" class="hover:text-primary-container transition-colors">Experticia</a>
            <a href="insights.html" class="hover:text-primary-container transition-colors">Insights</a>
            <a href="company.html" class="hover:text-primary-container transition-colors">Empresa</a>
        </div>
    </div>
    `,
    footer: `
    <footer class="bg-slate-950 pt-32 pb-12 px-8 border-t border-white/5 relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-container/50 to-transparent"></div>
        
        <div class="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 relative z-10">
            <div class="lg:col-span-5">
                <div class="flex items-center gap-4 mb-10 group">
                    <img src="assets/images/img203.jpg" alt="Logo" class="w-12 h-12 bg-white p-1 shadow-[0_0_20px_rgba(220,20,60,0.2)]">
                    <span class="font-display text-3xl font-black tracking-[0.2em] text-white">SASI<span class="text-primary-container">GLOBAL</span></span>
                </div>
                <p class="text-slate-400 font-body text-lg font-light leading-relaxed mb-12 max-w-md">
                    Liderando la vanguardia en ingeniería geoespacial y soluciones industriales de alta gama. Precisión, integridad y visión global en cada misión operativa.
                </p>
                <div class="flex gap-6">
                    <a href="#" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary-container hover:border-primary-container transition-all">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary-container hover:border-primary-container transition-all">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            
            <div class="lg:col-span-2">
                <h4 class="text-white font-display font-bold uppercase tracking-[0.3em] text-xs mb-10">Ecosistema</h4>
                <ul class="space-y-6 text-slate-400 font-display text-[11px] font-medium uppercase tracking-[0.2em]">
                    <li><a href="solutions.html" class="hover:text-primary-container transition-colors">Soluciones</a></li>
                    <li><a href="operations.html" class="hover:text-primary-container transition-colors">Operaciones</a></li>
                    <li><a href="expertise.html" class="hover:text-primary-container transition-colors">Experticia</a></li>
                    <li><a href="insights.html" class="hover:text-primary-container transition-colors">Insights</a></li>
                </ul>
            </div>

            <div class="lg:col-span-2">
                <h4 class="text-white font-display font-bold uppercase tracking-[0.3em] text-xs mb-10">Compañía</h4>
                <ul class="space-y-6 text-slate-400 font-display text-[11px] font-medium uppercase tracking-[0.2em]">
                    <li><a href="company.html" class="hover:text-primary-container transition-colors">Sobre Nosotros</a></li>
                    <li><a href="index.html#contacto" class="hover:text-primary-container transition-colors">Contacto</a></li>
                    <li><a href="#" class="hover:text-primary-container transition-colors">Carreras</a></li>
                    <li><a href="#" class="hover:text-primary-container transition-colors">Privacidad</a></li>
                </ul>
            </div>

            <div class="lg:col-span-3">
                <div class="bg-white/5 border border-white/10 p-10 backdrop-blur-xl">
                    <h4 class="text-white font-display font-bold uppercase tracking-[0.3em] text-xs mb-6">Portal Cliente</h4>
                    <p class="text-slate-400 text-xs font-light mb-8 leading-relaxed">Acceso exclusivo a paneles de inteligencia y monitoreo en tiempo real.</p>
                    <a href="#" class="block w-full py-4 bg-primary-container text-white text-center font-display text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">Ingresar</a>
                </div>
            </div>
        </div>

        <div class="max-w-[1440px] mx-auto pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-8">
            <p class="text-slate-500 font-display text-[9px] uppercase tracking-[0.5em]">© 2026 SASIGLOBAL SAS. INGENIERÍA DE ELITE.</p>
            <div class="flex gap-12 text-slate-500 font-display text-[9px] uppercase tracking-[0.3em]">
                <a href="#" class="hover:text-white transition-colors">Términos</a>
                <a href="#" class="hover:text-white transition-colors">Cookies</a>
            </div>
        </div>
    </footer>
    `
};

/**
 * Initializes the components and binds events
 */
function initGlobalComponents() {
    const headerPlaceholder = document.getElementById('global-header');
    const footerPlaceholder = document.getElementById('global-footer');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = components.navigation;
        initMobileMenu();
        // Signal that the header is ready for main.js scroll logic
        window.dispatchEvent(new CustomEvent('headerLoaded'));
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = components.footer;
    }

    // Set active link in nav
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const close = document.getElementById('close-menu');

    if (btn && menu && close) {
        btn.addEventListener('click', () => {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });

        // Close on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// Run as soon as DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalComponents);
} else {
    initGlobalComponents();
}
