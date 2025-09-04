const { sequelize, Venta, DetalleVenta, Producto } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const data = await Venta.findAll({
      include: [{ model: DetalleVenta, as: 'Detalles', include: [{ model: Producto, as: 'Producto' }] }],
      order: [['Id_Venta', 'DESC']]
    });
    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await Venta.findByPk(req.params.id, {
      include: [{ model: DetalleVenta, as: 'Detalles', include: [{ model: Producto, as: 'Producto' }] }]
    });
    if (!item) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(item);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { FechaVenta, Detalles } = req.body;
    if (!Array.isArray(Detalles) || Detalles.length === 0) {
      return res.status(400).json({ error: 'Detalles debe ser un arreglo con al menos un ítem' });
    }

    const venta = await Venta.create({ FechaVenta }, { transaction: t });

    for (const d of Detalles) {
      // d = { Id_Producto, Cantidad, PrecioUnit }
      if (!d || !d.Id_Producto || !d.Cantidad || d.Cantidad <= 0 || d.PrecioUnit == null) {
        await t.rollback();
        return res.status(400).json({ error: 'Detalle inválido (Id_Producto, Cantidad>0, PrecioUnit requerido)' });
      }
      await DetalleVenta.create({
        Id_Venta: venta.Id_Venta,
        Id_Producto: d.Id_Producto,
        Cantidad: d.Cantidad,
        PrecioUnit: d.PrecioUnit
      }, { transaction: t });
    }

    await t.commit();
    const created = await Venta.findByPk(venta.Id_Venta, {
      include: [{ model: DetalleVenta, as: 'Detalles', include: [{ model: Producto, as: 'Producto' }] }]
    });
    res.status(201).json(created);
  } catch (e) {
    await t.rollback();
    next(e);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Venta.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Venta no encontrada' });
    await item.destroy(); // CASCADE eliminará detalles
    res.json({ ok: true });
  } catch (e) { next(e); }
};
