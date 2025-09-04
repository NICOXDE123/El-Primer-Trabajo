const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/Venta_Controllers');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', ctrl.create);
router.delete('/:id', ctrl.remove);

module.exports = router;
