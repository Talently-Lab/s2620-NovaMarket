// src/app.js
const express = require('express');
require('dotenv').config();

const categoryRoutes = require('./routes/category.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
