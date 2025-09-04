// src/models/Venta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseTienda.js');

const Venta = sequelize.define('Venta', {
  Id_Venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  FechaVenta: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'FechaVenta es obligatoria' },
      isDate: true
    }
  }
}, {
  tableName: 'Venta',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

module.exports = Venta;
