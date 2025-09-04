// src/models/Proveedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseTienda.js');

const Proveedor = sequelize.define('Proveedor', {
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NomProveedor: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    set(v) {
      if (typeof v === 'string') this.setDataValue('NomProveedor', v.trim());
      else this.setDataValue('NomProveedor', v);
    },
    validate: {
      notEmpty: { msg: 'NomProveedor es obligatorio' },
      len: { args: [2, 100], msg: 'NomProveedor debe tener entre 2 y 100 caracteres' }
    }
  },
  Telefono: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  Email: {
    type: DataTypes.STRING(150),
    allowNull: true,
    validate: { isEmail: { msg: 'Email no válido' } }
  },
  Contacto: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'Proveedor',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

module.exports = Proveedor;
