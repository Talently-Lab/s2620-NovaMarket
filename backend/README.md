# NovaMarket API

API REST del e-commerce NovaMarket. Está organizada en tres capas (ruta, controlador y servicio) y solo los servicios acceden a la base de datos a través de Prisma.

## Stack

- Node.js con Express 5, usando CommonJS
- PostgreSQL alojado en Supabase
- Prisma v7 con `@prisma/adapter-pg`
- bcryptjs para hashear contraseñas
- jsonwebtoken para la autenticación con JWT
- dotenv y cors
- nodemon en desarrollo

## Requisitos

- Node.js 20.19 o superior (incluye npm)

```bash
npm install
npx prisma generate
npm run dev
```

El servidor escucha en el puerto definido en `PORT` y, si no está definido, en el 3000.
La app usa `DATABASE_URL` (puerto 6543, Transaction Pooler) en runtime. La CLI de Prisma usa `DIRECT_URL` (puerto 5432) para las migraciones.
El entorno lo decide el `.env`: en local apunta a la BD de dev; en Render se cargan los valores de prod.

## Datos de prueba (seed)

El seed carga el catálogo de productos desde el CSV `mock_catalogo_productos.csv - mock_catalogo_productos.csv (1).csv`, ubicado en la raíz de `backend/`.

```bash
cd backend
npx prisma migrate deploy # solo si la base de datos es nueva
npx prisma db seed
```

`npx prisma generate` manualmente después de cada migración (Prisma v7).

## Formato de respuesta

Salvo `/api/health`, todos los endpoints responden con la misma estructura.

Éxito:

```json
{ "success": true, "message": "...", "data": { } }
```

Error:

```json
{ "success": false, "message": "...", "error": "..." }
```

## Contrato de endpoints

URL base: `/api`

### Health

`GET /api/health`

Comprueba que el servidor está levantado.

Respuesta `200`:

```json
{ "status": "OK" }
```

### Autenticación

`POST /api/auth/register`

Registra un usuario con rol `CLIENTE` y devuelve un token JWT.

Body:

```json
{
  "email": "ana@correo.com",
  "password": "minimo8caracteres",
  "fullName": "Ana Pérez"
}
```

Validaciones:

- `email`, `password` y `fullName` son obligatorios y no pueden estar vacíos
- `email` tiene que tener un formato válido
- `password` necesita al menos 8 caracteres

Respuesta `201`:

```json
{
  "success": true,
  "message": "Usuario registrado con éxito",
  "data": {
    "user": {
      "id": "uuid",
      "email": "ana@correo.com",
      "fullName": "Ana Pérez",
      "role": "CLIENTE",
      "createdAt": "2026-10-08T00:00:00.000Z"
    },
    "token": "jwt"
  }
}
```

Errores:

- `400` si falta algún campo o los datos no pasan la validación
- `409` si el email ya está registrado
- `500` si ocurre un error interno

`POST /api/auth/login`

Inicia sesión con email y contraseña y devuelve un token JWT.

Body:

```json
{
  "email": "ana@correo.com",
  "password": "minimo8caracteres"
}
```

Validaciones:

- `email` y `password` son obligatorios y no pueden estar vacíos

Respuesta `200`:

```json
{
  "success": true,
  "message": "Sesión iniciada con éxito",
  "data": {
    "token": "jwt",
    "user": {
      "id": "uuid",
      "email": "ana@correo.com",
      "fullName": "Ana Pérez",
      "role": "CLIENTE"
    }
  }
}
```

`GET /api/auth/me`

Devuelve los datos del usuario autenticado. Requiere el header `Authorization: Bearer <token>`.

Respuesta `200`:

```json
{
  "success": true,
  "message": "Perfil obtenido con éxito",
  "data": {
    "id": "uuid",
    "email": "ana@correo.com",
    "fullName": "Ana Pérez",
    "role": "CLIENTE",
    "createdAt": "2026-10-16T00:00:00.000Z"
  }
}
```

Errores:

- `401` si no se envía token, es inválido o expiró, o el usuario ya no existe
- `403` si el usuario está inactivo
- `500` si ocurre un error interno

### Productos

Las rutas `GET` son públicas. `POST`, `PUT` y `DELETE` requieren el header `Authorization: Bearer <token>` de un usuario con rol `ADMIN`. El precio se devuelve siempre como string con 2 decimales, por ejemplo `"49.90"`.

Estructura de un producto:

```json
{
  "id": "uuid",
  "name": "Teclado mecánico",
  "description": "Switches red, layout ES",
  "price": "49.90",
  "stock": 10,
  "imageUrl": "https://...",
  "category": "Periféricos",
  "createdAt": "2026-10-08T00:00:00.000Z",
  "updatedAt": "2026-10-08T00:00:00.000Z"
}
```

#### Listar Productos

Ruta: `GET /api/products`

Headers: ninguno

Request: sin body

Response 200:

```json
{
  "success": true,
  "message": "Productos obtenidos con éxito",
  "data": [
    {
      "id": "uuid",
      "name": "Teclado mecánico",
      "description": "Switches red, layout ES",
      "price": "49.90",
      "stock": 10,
      "imageUrl": "https://...",
      "categoryId": 1,
      "brand": "Logitech",
      "notActive": false,
      "createdAt": "2026-10-08T00:00:00.000Z",
      "updatedAt": "2026-10-08T00:00:00.000Z",
      "category": { "id": 1, "name": "Periféricos", "createdAt": "2026-10-08T00:00:00.000Z" }
    }
  ]
}
```

Response (Error):

- `500` Error interno

```json
{
  "success": false,
  "message": "Error al obtener productos",
  "error": "<detalle del error>"
}
```

#### Listar Productos por Categoría

Ruta: `GET /api/products/category/:categoryName`

Headers: ninguno

Request: sin body. `categoryName` es el nombre de la categoría. La búsqueda no distingue mayúsculas, pero el nombre tiene que coincidir completo, por ejemplo `/api/products/category/periféricos`.

Response 200 (si la categoría no tiene productos activos, `data` es `[]`):

```json
{
  "success": true,
  "message": "Productos obtenidos con éxito",
  "data": [
    {
      "id": "uuid",
      "name": "Teclado mecánico",
      "description": "Switches red, layout ES",
      "price": "49.90",
      "stock": 10,
      "imageUrl": "https://...",
      "categoryId": 1,
      "brand": "Logitech",
      "notActive": false,
      "createdAt": "2026-10-08T00:00:00.000Z",
      "updatedAt": "2026-10-08T00:00:00.000Z",
      "category": { "id": 1, "name": "Periféricos", "createdAt": "2026-10-08T00:00:00.000Z" }
    }
  ]
}
```

Response (Error):

- `404` La categoría no existe

```json
{
  "success": false,
  "message": "Categoría no encontrada"
}
```

- `500` Error interno

```json
{
  "success": false,
  "message": "Error al obtener productos",
  "error": "<detalle del error>"
}
```

`GET /api/products/:id`

Devuelve un producto por id. Responde `200` con el producto en `data` o `404` si no existe.

`POST /api/products`

Crea un producto. Son obligatorios `name`, `price` y `category`. Los campos `description`, `stock` (por defecto 0), `imageUrl` y `brand` son opcionales. Responde `201` con el producto creado o `400` si el body es inválido.

`PUT /api/products/:id`

Actualiza los campos que se envíen en el body. Todos son opcionales, pero los que se envíen se validan igual que en `POST`. Responde `200` con el producto actualizado o `400` si el body es inválido o no trae ningún campo.

`DELETE /api/products/:id`

Elimina el producto. Responde `200` con `{ "id": "uuid" }` en `data`.

Errores de autenticación y permisos:

- `401` si falta el token o es inválido o expiró
- `403` si el usuario no es `ADMIN` e intenta hacer `POST`, `PUT` o `DELETE`

Salvo en `POST`, todavía no hay validación en la capa de controlador para productos, así que cualquier otro fallo, incluido un id inexistente, se devuelve como `500`.

## Reglas generales

- Roles: solo CLIENTE (por defecto)
- Moneda: USD con Decimal(10,2). La API devuelve el precio siempre con 2 decimales.
- Borrado lógico: columna `not_active` en usuarios. En la semana 3 o 4 se confirma si se aplica también a productos.

## .env

- Variables de entorno necesarias: `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET` y `JWT_EXPIRES_IN`.

## Despliegue en Render (pendiente)

- [ ] Agregar `"engines": { "node": ">=20.19" }` en `package.json` (Prisma v7 lo requiere).
- [ ] Configurar el Web Service con Root Directory `backend`, Build Command `npm install && npx prisma generate`, Start Command `npm start` y Health Check Path `/api/health`.
- [ ] Cargar en Render (Environment) `DATABASE_URL` (prod), `JWT_SECRET` (distinto al de dev), `JWT_EXPIRES_IN` y `CORS_ORIGIN` (URL del frontend desplegado).
- [ ] No definir `PORT` (lo asigna Render).
- [ ] Aplicar las migraciones en prod a mano antes del primer deploy (ver "Aplicar en producción").
- [ ] Probar `GET /api/health` y el login con la URL de Render.

## Tests

Los tests unitarios usan Jest y Supertest con el servicio mockeado, así que no se conectan a la base de datos.

```bash
cd backend
npm test
```

## Migraciones
### Crear una migración (dev)

Usa la `DIRECT_URL` del `.env` (BD de dev).

1. Editar `prisma/schema.prisma`.
2. Generar y aplicar en dev: `npx prisma migrate dev --name <descripcion>`
3. Revisar el `migration.sql` generado.
4. Verificar que dev quedó al día: `npx prisma migrate status`

Para cambios solo de datos (sin tocar el schema), en lugar de los pasos 1 y 2: crear la migración vacía con `npx prisma migrate dev --create-only --name <descripcion>`, escribir el SQL en su `migration.sql` y aplicarla con `npx prisma migrate dev`.

### Aplicar en producción (manual, después del merge)

Se pasa la URL de prod (puerto 5432) en el comando; tiene prioridad sobre el `.env`. El espacio inicial evita que quede en el historial de la terminal.

1. Ver migraciones pendientes: ` DIRECT_URL="<url prod>" npx prisma migrate status`
2. Aplicar: ` DIRECT_URL="<url prod>" npx prisma migrate deploy`
3. Confirmar que prod quedó al día: repetir el paso 1.

### Corregir una migración ya mergeada

No editar la existente: crear una nueva siguiendo "Crear una migración".
