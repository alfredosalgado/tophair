# Documento de Funcionalidad Web: Koke Top Hair

**Objetivo:** Este documento sirve como una guía detallada sobre la funcionalidad y el contenido esperado para cada sección del sitio web. Úsalo como referencia conceptual durante todo el proceso de desarrollo.

---

### **Paso 1: Funcionalidad de Elementos Transversales**

#### **1.1 Top Bar (Barra Superior)**
- **Contenido:** Debe mostrar de forma clara el teléfono principal (`+569 9004 5922`) y un correo de contacto (ej: `contacto@tophair.cl`).
- **Funcionalidad:** Será visible en la parte más alta de todas las páginas del sitio. No requiere interactividad compleja, pero el teléfono podría ser un enlace `tel:`.

#### **1.2 Navbar (Barra de Navegación Principal)**
- **Contenido:** Contendrá el logo de "Koke Top Hair" y los siguientes enlaces: "Inicio", "Servicios", "Marcas", "Nosotros", "Galería" y "Contacto".
- **Funcionalidad:**
    - Debe ser "sticky" (fija en la parte superior de la pantalla al hacer scroll).
    - El logo siempre debe enlazar a `index.html`.
    - El enlace correspondiente a la página activa debe tener un estilo visual diferente (ej: subrayado o en negrita) para que el usuario sepa dónde está.
    - Debe ser totalmente responsiva, colapsando en un menú de hamburguesa en dispositivos móviles.

#### **1.3 Footer (Pie de Página)**
- **Contenido:**
    - Columna 1: Logo y una breve descripción del salón.
    - Columna 2: Enlaces de navegación rápida (Inicio, Servicios, etc.).
    - Columna 3: Información de contacto (direcciones de sucursales, teléfonos, email).
    - Columna 4: Iconos de redes sociales (enlazando al Instagram).
    - Debajo de todo: Una línea con el copyright `© 2025 Koke Top Hair. Todos los derechos reservados.`
- **Funcionalidad:** Será visible en la parte inferior de todas las páginas.

**>> Acción del Agente:** Una vez implementados estos elementos en `index.html` y aprobado el diseño, deberás replicarlos en todas las demás páginas HTML del proyecto.

---

### **Paso 2: Funcionalidad de Secciones (Página `index.html`)**

#### **2.1 Sección Header/Inicio**
- **Contenido:** Una imagen de fondo de alta calidad (del salón o una modelo) con un texto superpuesto que transmita la esencia de la marca. Por ejemplo: "Más que un Salón, una Experiencia. Redescubre tu Estilo en Koke Top Hair". Debe incluir un botón "Call to Action" (CTA) como "Agenda tu Cita" que enlace a la sección de Contacto.
- **Funcionalidad:** Ser la primera impresión visual del sitio.

#### **2.2 Sección Servicios Ofrecidos**
- **Contenido:** Presentará los servicios principales en formato de "cards" (tarjetas). Cada card tendrá un ícono representativo (ej: tijeras, esmalte), el nombre del servicio (ej: "Alta Colorimetría", "Tratamientos de Reparación", "Manicure Profesional") y una breve descripción.
- **Funcionalidad:** Informar rápidamente al usuario sobre la oferta del salón.

#### **2.3 Sección Marcas y Productos**
- **Contenido:** Mostrará los logos de las marcas principales (Kérastase, Redken, Olaplex, L'Oréal, Wella, Moroccanoil) en formato de "cards". Cada card incluirá el logo, el nombre de la marca y un botón "Conoce la línea".
- **Funcionalidad:** Al hacer clic en el botón "Conoce la línea", el usuario será redirigido a la página HTML dedicada de esa marca (ej: de la card de Redken a `redken.html`).

#### **2.4 Sección Nosotros**
- **Contenido:** Usará el texto "Bienvenidos a Koke Top Hair" proporcionado en el informe. Debe incluir una imagen del equipo o del ambiente del salón. Se destacarán los valores: Atención Personalizada, Innovación, Calidad, etc.
- **Funcionalidad:** Conectar emocionalmente con el usuario y construir confianza.

#### **2.5 Sección Galería**
- **Contenido:** Mostrará las imágenes del salón (las estaciones de trabajo, la decoración, el área de manicure).
- **Funcionalidad:** Debe ser un carrusel o slider de imágenes, con navegación manual (flechas) y reproducción automática opcional, para mostrar el ambiente del lugar de forma dinámica y atractiva.

#### **2.6 Sección Contacto**
- **Contenido:**
    - Un formulario de contacto con los campos: Nombre, Email, Teléfono, Asunto, Mensaje.
    - La información de contacto: Direcciones de las sucursales (con un mapa de Google Maps incrustado si es posible), teléfonos y horario de atención.
- **Funcionalidad:** Permitir al usuario enviar consultas. El formulario debe tener validación básica (campos requeridos) en el lado del cliente (JS).

---

### **Paso 3: Funcionalidad de Páginas de Marcas (ej: `redken.html`)**

- **Contenido:**
    - Un encabezado con el logo y nombre de la marca.
    - Una breve descripción de la filosofía de la marca (tomada del informe).
    - Una sección de "Productos Destacados" donde cada producto se presenta en una "card". Cada card de producto debe tener:
        - Imagen del producto.
        - Nombre del producto (ej: "Acidic Bonding Concentrate Shampoo").
        - Breve descripción de su función.
        - Un botón "Consultar por WhatsApp" que abra una conversación de WhatsApp pre-configurada.
- **Funcionalidad:** Educar al cliente sobre los productos disponibles para la venta y facilitar la compra/consulta directa.