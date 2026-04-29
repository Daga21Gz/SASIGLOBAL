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
    initSupabaseProjects();
    
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

/**
 * Portafolio Vivo: GIS Map Integration (MapLibre + Cloudflare R2)
 */
function initGISMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // URL de tus datos en Cloudflare R2
    const R2_DATA_URL = 'https://pub-fec6b21939fb4076bfd409fa5c1d7669.r2.dev/sedes.json';

    // Asegurarse de que la librería está cargada
    if (typeof maplibregl === 'undefined') {
        console.warn('MapLibre GL JS not loaded yet.');
        return;
    }

    const map = new maplibregl.Map({
        container: 'map',
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [-74.5, 5.5], 
        zoom: 5.5,
        scrollZoom: false
    });

    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    map.on('load', async () => {
        try {
            const response = await fetch(R2_DATA_URL);
            const data = await response.json();

            map.addSource('sedes', {
                type: 'geojson',
                data: data
            });

            map.addLayer({
                id: 'sedes-points',
                type: 'circle',
                source: 'sedes',
                paint: {
                    'circle-radius': 8,
                    'circle-color': '#dc143c',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });

            map.on('click', 'sedes-points', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const props = e.features[0].properties;

                new maplibregl.Popup({ className: 'elite-popup', closeButton: false })
                    .setLngLat(coordinates)
                    .setHTML(`
                        <div class="p-4 font-display">
                            <h3 class="text-primary-container font-black uppercase text-xs tracking-widest mb-1">${props.ciudad}</h3>
                            <p class="text-slate-900 font-bold text-sm mb-2 uppercase">${props.tipo}</p>
                            <p class="text-slate-600 text-[10px] leading-relaxed font-light">${props.descripcion}</p>
                        </div>
                    `)
                    .addTo(map);
                
                map.flyTo({
                    center: coordinates,
                    zoom: 12,
                    speed: 0.8
                });
            });

            map.on('mouseenter', 'sedes-points', () => map.getCanvas().style.cursor = 'pointer');
            map.on('mouseleave', 'sedes-points', () => map.getCanvas().style.cursor = '');

        } catch (error) {
            console.error('Error cargando datos GIS desde R2:', error);
        }
    });
}

/**
 * Gestión de Contenido Dinámica: Supabase Integration
 */
async function initSupabaseProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    // Configuración de Supabase
    const SUPABASE_URL = 'https://iaogjtqigfpmqdshuawl.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_2ajudZKoCMicFhsfj6kztg_c32wI-YM';
    
    // Verificar si la librería de Supabase está cargada
    if (typeof supabase === 'undefined') {
        console.warn('Supabase SDK not loaded yet.');
        return;
    }

    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    try {
        // Traer los proyectos desde la tabla 'proyectos'
        const { data: proyectos, error } = await supabaseClient
            .from('proyectos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Limpiar skeleton loaders
        projectsGrid.innerHTML = '';

        if (!proyectos || proyectos.length === 0) {
            projectsGrid.innerHTML = '<p class="text-slate-400 font-light italic col-span-full text-center py-20 uppercase tracking-widest text-[10px]">No hay proyectos activos registrados en el Cloud.</p>';
            return;
        }

        // Renderizar proyectos con diseño Elite
        proyectos.forEach(proyecto => {
            const projectCard = `
                <div class="group relative bg-white border border-black/5 overflow-hidden scroll-child">
                    <!-- Image Container with Elite Hover -->
                    <div class="relative h-80 overflow-hidden bg-slate-100">
                        <img src="${proyecto.imagen_url || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80'}" 
                             alt="${proyecto.titulo}"
                             class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110">
                        <div class="absolute top-4 left-4">
                            <span class="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-900 border border-black/5">
                                ${proyecto.categoria || 'Ingeniería'}
                            </span>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-8 border-t border-black/5">
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="font-display text-2xl font-extrabold text-slate-900 leading-tight uppercase tracking-tighter">
                                ${proyecto.titulo}
                            </h3>
                            <span class="text-[10px] font-tech text-slate-400 font-bold">${proyecto.anio || '2024'}</span>
                        </div>
                        <p class="text-slate-500 font-body text-xs leading-relaxed mb-6 line-clamp-3">
                            ${proyecto.descripcion || 'Solución geoespacial avanzada ejecutada por SASIGLOBAL.'}
                        </p>
                        <div class="flex items-center justify-between pt-6 border-t border-black/[0.03]">
                            <div class="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                                Cliente: <span class="text-slate-900">${proyecto.cliente || 'Privado'}</span>
                            </div>
                            <button class="text-primary-container hover:text-slate-900 transition-colors">
                                <span class="material-symbols-outlined text-sm">arrow_forward_ios</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            projectsGrid.insertAdjacentHTML('beforeend', projectCard);
        });

    } catch (err) {
        console.error('Error sincronizando con Supabase:', err);
        projectsGrid.innerHTML = '<p class="text-red-500 text-xs uppercase tracking-widest font-black col-span-full text-center">Error de Sincronización Cloud</p>';
    }
}
