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

## Reglas generales

- Roles: solo CLIENTE (por defecto)
- Moneda: USD con Decimal(10,2). La API devuelve el precio siempre con 2 decimales.
- Borrado lógico: columna `not_active` en usuarios. En la semana 3 o 4 se confirma si se aplica también a productos.

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
