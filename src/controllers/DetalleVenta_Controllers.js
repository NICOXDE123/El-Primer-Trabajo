const { DetalleVenta, Producto } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const data = await DetalleVenta.findAll({
      include: [{ model: Producto, as: 'Producto' }],
      order: [['Id_Detalle', 'ASC']]
    });
    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await DetalleVenta.findByPk(req.params.id, {
      include: [{ model: Producto, as: 'Producto' }]
    });
    if (!item) return res.status(404).json({ error: 'DetalleVenta no encontrado' });
    res.json(item);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await DetalleVenta.create(req.body);
    res.status(201).json(item);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await DetalleVenta.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'DetalleVenta no encontrado' });
    await item.update(req.body);
    res.json(item);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await DetalleVenta.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'DetalleVenta no encontrado' });
    await item.destroy();
    res.json({ ok: true });
  } catch (e) { next(e); }
};
