// src/models/index.js
const sequelize = require('../config/databaseTienda.js');

const Categoria = require('./Categoria_models');
const Proveedor = require('./Proveedor_models');
const Producto = require('./Producto_Models');
const Venta = require('./Venta_Models');
const DetalleVenta = require('./DetalleVenta_Models');
const VentaResumen = require('./VentaResumen_Models');

// Asociaciones
// Categoria 1..N Producto
Categoria.hasMany(Producto, {
  foreignKey: 'Id_Categoria',
  as: 'Productos'
});
Producto.belongsTo(Categoria, {
  foreignKey: 'Id_Categoria',
  as: 'Categoria'
});

// Proveedor 1..N Producto
Proveedor.hasMany(Producto, {
  foreignKey: 'Id_Proveedor',
  as: 'Productos'
});
Producto.belongsTo(Proveedor, {
  foreignKey: 'Id_Proveedor',
  as: 'Proveedor'
});

// Venta 1..N DetalleVenta
Venta.hasMany(DetalleVenta, {
  foreignKey: 'Id_Venta',
  as: 'Detalles',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
DetalleVenta.belongsTo(Venta, {
  foreignKey: 'Id_Venta',
  as: 'Venta'
});

// Producto 1..N DetalleVenta
Producto.hasMany(DetalleVenta, {
  foreignKey: 'Id_Producto',
  as: 'Detalles'
});
DetalleVenta.belongsTo(Producto, {
  foreignKey: 'Id_Producto',
  as: 'Producto'
});

module.exports = {
  sequelize,
  Categoria,
  Proveedor,
  Producto,
  Venta,
  DetalleVenta,
  VentaResumen
};
