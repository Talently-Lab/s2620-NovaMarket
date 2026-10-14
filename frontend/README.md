# NovaMarket - Frontend MVP

Este repositorio contiene el código frontend para el MVP de **NovaMarket**, un e-commerce tecnológico construido con **React**, **Vite**, **Tailwind CSS**, **React Router DOM** y **Axios**.


## 🛠️ Stack Tecnológico

- **Core:** React + Vite (JavaScript)
- **Estilos:** Tailwind CSS (Diseño responsivo Mobile-First)
- **Enrutamiento:** React Router DOM (Rutas públicas, dinámicas y protegidas)
- **Cliente HTTP:** Axios (Instancias centralizadas e interceptores JWT)
- **Iconografía:** Lucide React


## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular para mantener el código ordenado y escalable. La organización principal dentro de `src/` es la siguiente:

```text
src/
├── assets/          # Archivos estáticos (imágenes, fuentes, íconos)
├── components/      # Componentes UI bajo metodología Atomic Design
│   ├── atoms/       # Elementos indivisibles (Button, Badge)
│   ├── molecules/   # Bloques con entidad propia (ProductCard, Skeletons, CategoryCard)
│   ├── organisms/   # Secciones compuestas (NavBar, Footer, Hero, FeaturedProducts)
│   └── layout/      # Estructura base de la aplicación (Layout con Outlet)
├── context/         # Estado global de la aplicación (AuthContext)
├── hooks/           # Custom Hooks con la lógica de negocio (useLogin, useRegister, useProducts, useProductDetail)
├── pages/           # Vistas 100% presentacionales (Home, LoginPage, RegisterPage, ProductsPage, ProductDetailPage)
├── routes/          # Guardias de navegación y seguridad (PrivateRoute)
└── services/        # Capa de datos y peticiones HTTP (authService, productService)
```


## 🧠 Arquitectura y Manejo de Estados

Para mantener una arquitectura limpia y evitar sobre-ingeniería sin usar Redux, el estado y la lógica se dividen en tres capas claras:

- **Vistas Presentacionales `(pages/)` + Custom Hooks `(hooks/)` :** Las páginas se mantienen estrictamente enfocadas en la interfaz visual (UI). Toda la lógica de negocio (manejo de formularios, validaciones, lectura de parámetros de URL, estados de carga y llamados a servicios) está encapsulada en Custom Hooks dedicados.
- **Estado Global (Context API):** Se utiliza nativamente para la información que necesita ser accedida desde múltiples partes de la aplicación simultáneamente, como la sesión del usuario o el contenido del carrito de compras.
- **Capa de Servicios (Axios):** Las llamadas HTTP están desacopladas de los componentes. Se implementó un interceptor de peticiones en `authService` que adjunta automáticamente el header Authorization: `Bearer <token>` en cada solicitud.


## 🧩 Arquitectura de Componentes (Atomic Design)

La interfaz está dividida en niveles de complejidad para maximizar la reutilización:

- **Átomos `(atoms)`:** Elementos base de UI que no dependen de otros componentes. Manejan estados puramente visuales (ej. un estado local de `loading` en un botón o `error` en un input).
  - *Componentes:* `Button`, `Input`, `Loader`.

- **Moléculas `(molecules)`:** Combinaciones de átomos que representan una entidad con datos. Reciben su información por `props` y pueden disparar acciones hacia el estado global.
  - *Componentes:* `ProductCard` (muestra el producto y permite agregarlo), `CartItem` (gestiona la cantidad en el carrito).

- **Organismos `(organisms)`:** Secciones complejas e independientes que agrupan lógicas de negocio y dictan el layout. Son los principales consumidores del Context API.
  - *Componentes:* `Navbar` (lee sesión de usuario y contador del carrito), `CartModal` (muestra el resumen de compra), `LoginForm`.


## ⚙️ Instalación y Ejecución Local

1. Clonar el repositorio e instalar dependencias
```npm install```

2. Iniciar el servidor de desarrollo
```npm run dev```


## 👨‍💻 Proyecto y Equipo

Este módulo de **Frontend** es parte del proyecto principal NovaMarket:
- 🔗 **Repositorio Raíz:** [Talently-Lab / s2620-NovaMarket](https://github.com/Talently-Lab/s2620-NovaMarket)

**Facundo Ledesma** - *Frontend Developer*
- GitHub: [@FacuLedesmaBertalot](https://github.com/FacuLedesmaBertalot)


> *Nota: Este README puede irse modificando, aplicación en desarrollo.*