const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/Producto_Controller.js');

// Rutas específicas primero (para no colisionar con :id)
router.get('/categoria/:categoria', ctrl.byCategoria); // id o nombre
router.get('/proveedor/:proveedor', ctrl.byProveedor); // id o nombre

// CRUD
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
