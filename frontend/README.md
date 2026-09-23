# NovaMarket - Frontend MVP

Este repositorio contiene el código frontend para el MVP de NovaMarket, construido con React, Vite, Tailwind CSS y JavaScript Vanilla.

---

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular para mantener el código ordenado y escalable. La organización principal dentro de `src/` es la siguiente:

```text
src/
├── assets/      # Archivos estáticos (imágenes, fuentes, íconos)
├── components/  # Componentes UI reutilizables (botones, tarjetas, modales, etc.)
├── context/     # Proveedores de estado global (ej. CartContext, AuthContext)
├── hooks/       # Hooks personalizados para encapsular lógica reutilizable
├── pages/       # Vistas completas asociadas a las rutas (Home, Catalog, Checkout)
└── services/    # Configuración y llamados a las APIs externas (Axios)
```

---

## 🧠 Arquitectura y Manejo de Estados

Para mantener una arquitectura simple y evitar sobre-ingeniería, no utilizamos Redux. El estado se administra de la siguiente manera:

- **Componentes Visuales:** Se utiliza una aproximación de Atomic Design (atoms, molecules, organisms) para construir la interfaz de lo más simple a lo más complejo, facilitando la reutilización.
- **Estado Global (Context API):** Se utiliza nativamente para la información que necesita ser accedida desde múltiples partes de la aplicación simultáneamente, como la sesión del usuario o el contenido del carrito de compras.
- **Estado Local (useState):** Se reserva para el comportamiento interno de los componentes, como el manejo de formularios, estados de carga visuales o apertura/cierre de menús desplegables y modales.

---

## 🧩 Arquitectura de Componentes (Atomic Design)

La interfaz está dividida en niveles de complejidad para maximizar la reutilización. Las propiedades (props) exactas y estados locales pueden evolucionar durante el desarrollo del MVP, pero mantienen esta regla de negocio base:

- **Átomos (Atoms):** Elementos base de UI que no dependen de otros componentes. Manejan estados puramente visuales (ej. un estado local de `loading` en un botón o `error` en un input).
  - *Componentes:* `Button`, `Input`, `Loader`.

- **Moléculas (Molecules):** Combinaciones de átomos que representan una entidad con datos. Reciben su información por `props` y pueden disparar acciones hacia el estado global.
  - *Componentes:* `ProductCard` (muestra el producto y permite agregarlo), `CartItem` (gestiona la cantidad en el carrito).

- **Organismos (Organisms):** Secciones complejas e independientes que agrupan lógicas de negocio y dictan el layout. Son los principales consumidores del Context API.
  - *Componentes:* `Navbar` (lee sesión de usuario y contador del carrito), `CartModal` (muestra el resumen de compra), `LoginForm`.

---

## 👨‍💻 Proyecto y Equipo

Este módulo de **Frontend** es parte del proyecto principal NovaMarket:
- 🔗 **Repositorio Raíz:** [Talently-Lab / s2620-NovaMarket](https://github.com/Talently-Lab/s2620-NovaMarket)

**Facundo Ledesma** - *Frontend Developer*
- GitHub: [@FacuLedesmaBertalot](https://github.com/FacuLedesmaBertalot)

---

> *Nota: Este README puede irse modificando, aplicación en desarrollo.*