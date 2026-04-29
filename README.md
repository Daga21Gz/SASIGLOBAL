# SASIGLOBAL | Elite Enterprise Portfolio

## 🌐 Visión General
SASIGLOBAL SAS es una plataforma de ingeniería geoespacial de alta gama, modernizada para ofrecer una experiencia de usuario sofisticada, intuitiva y premium. El proyecto utiliza una arquitectura de **Orquestación de Componentes Globales** para garantizar la consistencia de marca y la eficiencia técnica en todas sus vistas.

## 🚀 Arquitectura Técnica

### 1. Global Component Orchestrator (`assets/js/components.js`)
Centraliza la lógica del `Header` y `Footer`. 
- **Inyección Dinámica**: Los componentes se cargan mediante fetch en placeholders específicos (`#global-header`, `#global-footer`).
- **Sincronización de Eventos**: Dispara el evento `headerLoaded` para permitir que otros scripts (como `main.js`) inicialicen efectos de scroll y menús móviles de forma segura una vez que el DOM está completo.

### 2. Diseño Visual "VIP Elite"
- **Paleta de Colores**: Blanco, Gris Seda, Negro Profundo y Crimson SASI (#dc143c).
- **Glassmorphism**: Uso extensivo de fondos translúcidos con `backdrop-blur` para una estética moderna y limpia.
- **Background Orchestration**: Fondo dinámico (`.bg-orchestrator`) que equilibra legibilidad y profundidad visual sin saturar la experiencia del usuario.

### 3. Optimización de Activos
- **Localidad**: Se han eliminado dependencias de imágenes externas (Unsplash) para evitar errores 404, migrando a activos locales verificados en `assets/images/`.
- **Formato**: Uso preferente de PNG/SVG de alta calidad para garantizar nitidez en pantallas de alta densidad.

## 🛠️ Tecnologías
- **Core**: HTML5, Vanilla JavaScript.
- **Styling**: Tailwind CSS (CDN para desarrollo, preparado para CLI).
- **Animations**: CSS3 (Cubic-Bezier) e Intersection Observer API.
- **Tooling**: `npx autoskills` para auditorías de calidad y mejores prácticas.

## 📁 Estructura del Proyecto
```text
/
├── assets/
│   ├── js/
│   │   └── components.js     # Orquestador central
│   ├── images/               # Activos locales (PNG/SVG)
│   └── logo.svg              # Identidad corporativa
├── main.js                   # Lógica de interacciones y scroll
├── style.css                 # Estilos core y animaciones premium
├── index.html                # Portal Principal
├── solutions.html            # Portafolio de Soluciones
├── operations.html           # Red Global de Operaciones
├── expertise.html            # Autoridad Técnica
├── insights.html             # Inteligencia de Datos
└── company.html              # Visión Corporativa
```

## 📋 Guía de Mantenimiento
Para añadir una nueva página al ecosistema SASIGLOBAL:
1. Incluya los placeholders `<header id="global-header"></header>` y `<footer id="global-footer"></footer>`.
2. Importe `assets/js/components.js` **antes** de `main.js`.
3. El sistema inyectará automáticamente la navegación actualizada y el footer corporativo.

---
**SASIGLOBAL SAS** | *Autoridad Geoespacial. Ingeniería de Precisión Industrial.*
