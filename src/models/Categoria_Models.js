// src/models/Categoria.js
//const { DataTyp// src/models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseTienda.js');

const Categoria = sequelize.define('Categoria', {
  Id_Categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NomCategoria: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    set(v) {
      if (typeof v === 'string') this.setDataValue('NomCategoria', v.trim());
      else this.setDataValue('NomCategoria', v);
    },
    validate: {
      notEmpty: { msg: 'NomCategoria es obligatorio' },
      len: { args: [2, 100], msg: 'NomCategoria debe tener entre 2 y 100 caracteres' }
    }
  }
}, {
  tableName: 'Categoria',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

module.exports = Categoria;
