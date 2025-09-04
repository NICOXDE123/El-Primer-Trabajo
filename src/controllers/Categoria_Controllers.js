const { Op } = require('sequelize');
const { Categoria } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const { q } = req.query;
    const where = q ? { NomCategoria: { [Op.substring]: q.trim() } } : {};
    const data = await Categoria.findAll({ where, order: [['Id_Categoria', 'ASC']] });
    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(item);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Categoria.create(req.body);
    res.status(201).json(item);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
    await item.update(req.body);
    res.json(item);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
    await item.destroy();
    res.json({ ok: true });
  } catch (e) { next(e); }
};
