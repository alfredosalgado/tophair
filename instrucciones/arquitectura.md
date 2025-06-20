# Instrucción para Agente MCP-Dev: Creación de la Arquitectura del Proyecto

**Objetivo:** Construir la estructura de carpetas y archivos para el sitio web de "Koke Top Hair".

**Regla Crítica:** En este paso, **NO DEBES ESCRIBIR NINGÚN CÓDIGO** dentro de los archivos. Tu única tarea es crear las carpetas y los archivos vacíos en la ubicación correcta.

**Instrucción:** Procede a crear la siguiente arquitectura de proyecto:

/ (RAÍZ DEL PROYECTO)
├── index.html
├── kerastase.html
├── redken.html
├── loreal.html
├── olaplex.html
├── wella.html
├── moroccanoil.html
│
└── /assets
    ├── /css
    │   ├── style.css             // Estilos generales y variables
    │   ├── topbar.css
    │   ├── navbar.css
    │   ├── header.css
    │   ├── services.css
    │   ├── brands.css            // Estilos para la sección de marcas en el index
    │   ├── about.css
    │   ├── gallery.css
    │   ├── contact.css
    │   ├── footer.css
    │   └── template-marca.css    // Estilo plantilla para las páginas de cada marca
    │
    ├── /js
    │   ├── main.js               // Lógica general del sitio
    │   ├── topbar.js
    │   ├── navbar.js
    │   ├── header.js
    │   ├── services.js
    │   ├── brands.js
    │   ├── about.js
    │   ├── gallery.js
    │   ├── contact.js
    │   └── footer.js
    │
    └── /img
        ├── /logos                // Para logos de marcas (Kérastase, Redken, etc.)
        ├── /brands               // Para banners o imágenes de ambiente de las marcas
        ├── /gallery              // Para fotos del salón
        ├── /products             // Para imágenes de cada botella o producto
        └── /icons                // Para íconos (teléfono, email, redes sociales, etc.)

Una vez que hayas creado esta estructura de archivos y carpetas, notifícame que has completado la tarea para proceder al siguiente paso.