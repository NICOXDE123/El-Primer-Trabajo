const { VentaResumen } = require('../models');

// GET /api/ventas/resumen
exports.list = async (req, res, next) => {
  try {
    const filas = await VentaResumen.findAll({ order: [['Id_Venta', 'DESC']] });
    res.json(filas);
  } catch (e) { next(e); }
};

// GET /api/ventas/resumen/:id
exports.get = async (req, res, next) => {
  try {
    const fila = await VentaResumen.findByPk(req.params.id);
    if (!fila) return res.status(404).json({ error: 'Venta no encontrada en el resumen' });
    res.json(fila);
  } catch (e) { next(e); }
};