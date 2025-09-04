// src/models/DetalleVenta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseTienda.js');

const DetalleVenta = sequelize.define('DetalleVenta', {
  Id_Detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Id_Venta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Id_Producto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [1], msg: 'Cantidad debe ser > 0' },
      isInt: true
    }
  },
  PrecioUnit: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: { args: [0], msg: 'PrecioUnit no puede ser negativo' }
    }
  }
}, {
  tableName: 'DetalleVenta',
  timestamps: false,
  indexes: [
    { fields: ['Id_Venta'] },
    { fields: ['Id_Producto'] }
  ],
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

module.exports = DetalleVenta;
