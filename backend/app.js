const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const healthRoutes = require('./src/routes/health.routes');
const productRoutes = require('./src/routes/product.routes');
const authRoutes = require('./src/routes/auth.routes');

app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
