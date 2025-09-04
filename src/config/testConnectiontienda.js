// src/config/testConnection.js
const sequelize = require('./databaseTienda.js');
// Función para probar la conexión
async function testConnection() {
try {
// Intentar conectar a la base de datos
await sequelize.authenticate();
console.log('Conexión a MySQL exitosa!');
// Mostrar información de la conexión
console.log(`Base de datos: ${sequelize.config.database}`);
console.log(`Host: ${sequelize.config.host}:${sequelize.config.port}`)} catch (error) {
console.error('Error al conectar con MySQL:', error.message);
// Ayuda para errores comunes
if (error.message.includes('ECONNREFUSED')) {
console.log('Solución: Verifica que MySQL esté ejecutándose');
}
if (error.message.includes('Access denied')) {
console.log('Solución: Verifica usuario y contraseña');
}
}
}
// Ejecutar la prueba
testConnection();