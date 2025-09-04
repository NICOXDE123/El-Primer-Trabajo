// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const { sequelize } = require('./models');

const categoriaRoutes   = require('./routes/Categoria_Routers.js');
const proveedorRoutes   = require('./routes/Proveedor_Routers.js');
const productoRoutes    = require('./routes/Producto_Routers.js');
const ventaRoutes       = require('./routes/Venta_Routes.js');
const detalleRoutes     = require('./routes/DetalleVenta_Routes.js');

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/detalles', detalleRoutes);

// Health
app.get('/', (req, res) => {
  res.json({
    api: 'OK',
    endpoints: [
      '/api/categorias', '/api/proveedores', '/api/productos',
      '/api/productos/categoria/:categoria', '/api/productos/proveedor/:proveedor',
      '/api/ventas', '/api/detalles'
    ]
  });
});

// Errores
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno' });
});

const PORT = process.env.PORT || 3000;
sequelize.authenticate().then(() => {
  console.log('Conexión a MySQL exitosa');
  // En desarrollo, si quieres crear tablas automáticamente:
  // return sequelize.sync(); // o { alter: true }
}).then(() => {
  app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));
}).catch(err => {
  console.error('Error de conexión a MySQL:', err.message);
});

module.exports = app;