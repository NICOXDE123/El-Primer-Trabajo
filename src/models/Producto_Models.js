// src/models/Producto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseTienda.js');

const Producto = sequelize.define('Producto', {
  Id_Producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Id_Categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NomProducto: {
    type: DataTypes.STRING(120),
    allowNull: false,
    set(v) {
      if (typeof v === 'string') this.setDataValue('NomProducto', v.trim());
      else this.setDataValue('NomProducto', v);
    },
    validate: {
      notEmpty: { msg: 'NomProducto es obligatorio' },
      len: { args: [2, 120], msg: 'NomProducto debe tener entre 2 y 120 caracteres' }
    }
  },
  PrecioCompra: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: { args: [0], msg: 'PrecioCompra no puede ser negativo' }
    }
  },
  PrecioVenta: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: { args: [0], msg: 'PrecioVenta no puede ser negativo' }
    }
  }
}, {
  tableName: 'Producto',
  timestamps: false,
  indexes: [
    { fields: ['Id_Categoria'] },
    { fields: ['Id_Proveedor'] },
    { fields: ['NomProducto'] }
  ],
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

module.exports = Producto;
