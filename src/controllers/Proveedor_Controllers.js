const { Op } = require('sequelize');
const { Proveedor } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const { q } = req.query;
    const where = q ? { NomProveedor: { [Op.substring]: q.trim() } } : {};
    const data = await Proveedor.findAll({ where, order: [['Id_Proveedor', 'ASC']] });
    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await Proveedor.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(item);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Proveedor.create(req.body);
    res.status(201).json(item);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Proveedor.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Proveedor no encontrado' });
    await item.update(req.body);
    res.json(item);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Proveedor.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Proveedor no encontrado' });
    await item.destroy();
    res.json({ ok: true });
  } catch (e) { next(e); }
};
