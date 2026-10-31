const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const healthRoutes = require('./src/routes/health.routes');
const productRoutes = require('./src/routes/product.routes');
const authRoutes = require('./src/routes/auth.routes');
const categoryRoutes = require('./src/routes/category.routes');
const orderRoutes = require('./src/routes/order.routes');

app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = app;
