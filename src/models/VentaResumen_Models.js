const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseTienda');

const VentaResumen = sequelize.define('VentaResumen', {
  Id_Venta:    { type: DataTypes.INTEGER, primaryKey: true },
  FechaVenta:  { type: DataTypes.DATEONLY },
  TotalVenta:  { type: DataTypes.DECIMAL(14,2) },
  Utilidad:    { type: DataTypes.DECIMAL(14,2) },   // asegúrate de que esté en la vista
  MargenVenta: { type: DataTypes.DECIMAL(10,2) }    // porcentaje
}, {
  tableName: 'v_ventas_totales', // nombre EXACTO de la vista en MySQL
  timestamps: false
});

module.exports = VentaResumen