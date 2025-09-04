const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/VentaResumen_Controllers');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);

module.exports = router;