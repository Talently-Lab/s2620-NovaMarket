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

## Puesta en marcha

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

El servidor escucha en el puerto definido en `PORT` y, si no está definido, en el 3000.

La app usa `DATABASE_URL` (puerto 6543, Transaction Pooler) en runtime. La CLI de Prisma usa `DIRECT_URL` (puerto 5432) para las migraciones.

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

### Productos

Por ahora estas rutas no están protegidas con JWT. El precio se devuelve siempre como string con 2 decimales, por ejemplo `"49.90"`.

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

`GET /api/products`

Lista todos los productos. Responde `200` con un array de productos en `data`.

`POST /api/products`

Crea un producto. Son obligatorios `name`, `price` y `category`. Los campos `description`, `stock` (por defecto 0) e `imageUrl` son opcionales. Responde `201` con el producto creado.

`PUT /api/products/:id`

Actualiza los campos que se envíen en el body. Responde `200` con el producto actualizado.

`DELETE /api/products/:id`

Elimina el producto. Responde `200` con `{ "id": "uuid" }` en `data`.

Todavía no hay validación en la capa de controlador para productos, así que cualquier fallo, incluido un id inexistente, se devuelve como `500`.

### Middleware de autenticación

`src/middlewares/auth.middleware.js` exporta `authenticate`. Este middleware lee el header `Authorization: Bearer <token>`, valida el token y deja el payload (`id`, `email`, `role`) en `req.user`. Si falta el token responde `401` con "Token no proporcionado", y si el token es inválido o expiró responde `401` con "Token inválido o expirado".

## Reglas generales

- Roles: solo CLIENTE (por defecto) y ADMIN. No hay rol de invitado.
- Moneda: USD con Decimal(10,2). La API devuelve el precio siempre con 2 decimales.
- Borrado lógico: columna `not_active` en usuarios. En la semana 3 o 4 se confirma si se aplica también a productos.

## Completado

- Modelo User en `prisma/schema.prisma` (`fullName` y `passwordHash`).
- Hasheo de contraseñas con bcryptjs en el servicio de auth.
- `POST /api/auth/register` con validación, token JWT y respuesta 409 si el email ya existe.
- Middleware JWT para autorización Bearer.
- `JWT_SECRET` configurado en las variables de entorno (`.env`).

## Pendiente

- `POST /api/auth/login`: debe responder "Credenciales inválidas" cuando falle el email o la contraseña, y rechazar el acceso si `not_active = true`.
- `GET /api/auth/me`: ruta protegida que devuelve el usuario sin `passwordHash`.
- Validar login y `/me` en Postman.

## A tener en cuenta

- Variables de entorno necesarias: `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET` y `JWT_EXPIRES_IN`.
- Hay que correr `npx prisma generate` manualmente después de cada migración (Prisma v7).
- Migraciones aplicadas hasta el momento: `init`, `add_not_active_to_users` y `rename_role_customer_to_cliente`.
