# Hoja de Ruta de Desarrollo: Koke Top Hair

**Instrucciones:** Sigue esta hoja de ruta de manera estrictamente secuencial. Completa un paso a la vez. Después de finalizar cada paso, detente, notifica tu progreso y espera la aprobación antes de continuar con el siguiente. Marca cada paso completado con una `[x]`.

### Fase 1: Estructura y Elementos Transversales

- [x] **Paso A: Estructura HTML Básica**
    - [x] Crea la estructura fundamental en **todos** los archivos HTML (`index.html`, `redken.html`, etc.).
    - [x] Incluye `<!DOCTYPE html>`, `<html>`, `<head>`, y `<body>`.
    - [x] En el `<head>`, añade las etiquetas `meta` básicas (charset, viewport).
    - [x] Asigna un título (`<title>`) único y descriptivo a cada página (ej: "Inicio - Koke Top Hair", "Línea Redken - Koke Top Hair").
    - [x] Vincula los archivos CSS y JS correspondientes a cada página. Asegúrate de que las rutas sean correctas (`./assets/...`).
    - *Nota: Comenta el código para explicar la función de cada vínculo o meta etiqueta importante.*

- [x] **Paso B: Desarrollo de la Top Bar**
    - [x] Escribe el código HTML para la Top Bar únicamente en `index.html`.
    - [x] Crea los estilos correspondientes en `topbar.css` para que coincida con la funcionalidad descrita.
    - [x] **PAUSA:** Espera aprobación. Si se aprueba, replica el código HTML en todos los demás archivos HTML.

- [ ] **Paso C: Desarrollo de la Navbar**
    - [x] Escribe el código HTML para la Navbar únicamente en `index.html`.
    - [x] Crea los estilos en `navbar.css`, incluyendo el estado "activo" y el diseño responsivo (menú hamburguesa).
    - [x] Escribe el código en `navbar.js` para la funcionalidad del menú hamburguesa en móviles.
    - [x] **PAUSA:** Espera aprobación. Si se aprueba, replica el código HTML y los vínculos JS/CSS en todos los demás archivos HTML.

- [x] **Paso J: Desarrollo del Footer** (Adelantado por ser transversal)
    - [x] Escribe el código HTML para el Footer únicamente en `index.html`.
    - [x] Crea los estilos correspondientes en `footer.css`.
    - [x] Crea el archivo `footer.js` con funcionalidad JavaScript.
    - [x] **PAUSA:** Espera aprobación. Si se aprueba, replica el código HTML en todos los demás archivos HTML.

### Fase 2: Construcción de la Página de Inicio (`index.html`)

- [x] **Paso D: Sección Header**
    - [x] Escribe el código HTML para la sección Header en `index.html`.
    - [x] Crea los estilos en `header.css`, incluyendo la imagen de fondo y el texto superpuesto.

- [x] **Paso E: Sección Servicios**
    - [x] Escribe el código HTML para la sección de Servicios en `index.html`.
    - [x] Crea los estilos para las "cards" de servicios en `services.css`.
    - [x] Implementa funcionalidad JavaScript en `services.js` para interacciones.

- [x] **Paso F: Sección Marcas y Productos**
    - [x] Escribe el código HTML para la sección de Marcas en `index.html`.
    - [x] Crea los estilos para las "cards" de marcas en `brands.css`. Asegúrate de que los botones "Conoce la línea" apunten a los archivos HTML correctos.

- [x] **Paso G: Sección Nosotros**
    - [x] Escribe el código HTML para la sección Nosotros en `index.html`, utilizando el contenido del informe.
    - [x] Crea los estilos en `about.css`.

- [x] **Paso H: Sección Galería**
    - [x] Escribe el código HTML para la sección Galería en `index.html`.
    - [x] Escribe el código JS en `gallery.js` para la funcionalidad del carrusel (se recomienda una librería como Swiper.js o crear una desde cero).
    - [x] Crea los estilos en `gallery.css`.

- [x] **Paso I: Sección Contacto**
    - [x] Escribe el código HTML para la sección de Contacto en `index.html`, incluyendo el formulario.
    - [x] Escribe el código JS en `contact.js` para la validación del formulario.
    - [x] Crea los estilos en `contact.css`.

### Fase 3: Construcción de Páginas de Marcas

- [x] **Paso K: Página de Marca - Redken**
    - [x] Escribe el código HTML completo para la página `redken.html`, siguiendo la funcionalidad descrita (encabezado, descripción, cards de productos).
    - [x] Crea los estilos en `template-marca.css` para todas las paginas de productos.

    - [ ] **PAUSA:** Espera aprobación. Una vez aprobado el diseño y la estructura, procede a replicar esta misma estructura para las demás páginas de marcas (`kerastase.html`, `olaplex.html`, etc.), adaptando el contenido a cada una.

### Fase 4: Optimización y Entrega Final

- [ ] **Paso L: SEO y Analítica**
    - [ ] Optimiza las etiquetas `<title>` y `<meta name="description">` en todas las páginas con contenido relevante y palabras clave.
    - [ ] Asegúrate de que todas las imágenes (`<img>`) tengan atributos `alt` descriptivos.
    - [ ] Inserta el código de seguimiento de Google Analytics proporcionado justo antes de la etiqueta de cierre `</head>`.

- [ ] **Paso M: Sugerencias Adicionales**
    - [ ] **Revisión de Responsividad:** Realiza una revisión final en todas las páginas para asegurar una correcta visualización en diversos tamaños de pantalla (móvil, tablet, escritorio).
    - [ ] **Optimización de Rendimiento:** Comprime las imágenes y considera minificar los archivos CSS y JS para una carga más rápida.
    - [ ] **Accesibilidad (a11y):** Revisa el uso de HTML semántico (ej: `<nav>`, `<main>`, `<section>`) y el contraste de colores.
    - [ ] **Favicon:** Agrega un favicon para el sitio web.
    - [ ] **Página 404:** Crea un archivo `404.html` con un diseño amigable para errores de página no encontrada.