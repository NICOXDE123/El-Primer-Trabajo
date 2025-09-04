const { Op } = require('sequelize');
const { Producto, Categoria, Proveedor } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const { q } = req.query;
    const where = q ? { NomProducto: { [Op.substring]: q.trim() } } : {};
    const data = await Producto.findAll({
      where,
      include: [
        { model: Categoria, as: 'Categoria', attributes: ['Id_Categoria', 'NomCategoria'] },
        { model: Proveedor, as: 'Proveedor', attributes: ['Id_Proveedor', 'NomProveedor'] }
      ],
      order: [['Id_Producto', 'ASC']]
    });
    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await Producto.findByPk(req.params.id, {
      include: [
        { model: Categoria, as: 'Categoria', attributes: ['Id_Categoria', 'NomCategoria'] },
        { model: Proveedor, as: 'Proveedor', attributes: ['Id_Proveedor', 'NomProveedor'] }
      ]
    });
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(item);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Producto.create(req.body);
    res.status(201).json(item);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Producto.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
    await item.update(req.body);
    res.json(item);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Producto.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
    await item.destroy();
    res.json({ ok: true });
  } catch (e) { next(e); }
};

// GET /api/productos/categoria/:categoria  (id numérico o nombre)
exports.byCategoria = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const whereCat = /^\d+$/.test(categoria)
      ? { Id_Categoria: Number(categoria) }
      : { NomCategoria: { [Op.substring]: categoria.trim() } };

    const data = await Producto.findAll({
      include: [{
        model: Categoria,
        as: 'Categoria',
        where: whereCat,
        attributes: ['Id_Categoria', 'NomCategoria']
      }, {
        model: Proveedor,
        as: 'Proveedor',
        attributes: ['Id_Proveedor', 'NomProveedor']
      }]
    });
    res.json(data);
  } catch (e) { next(e); }
};

// GET /api/productos/proveedor/:proveedor (id numérico o nombre)
exports.byProveedor = async (req, res, next) => {
  try {
    const { proveedor } = req.params;
    const whereProv = /^\d+$/.test(proveedor)
      ? { Id_Proveedor: Number(proveedor) }
      : { NomProveedor: { [Op.substring]: proveedor.trim() } };

    const data = await Producto.findAll({
      include: [{
        model: Proveedor,
        as: 'Proveedor',
        where: whereProv,
        attributes: ['Id_Proveedor', 'NomProveedor']
      }, {
        model: Categoria,
        as: 'Categoria',
        attributes: ['Id_Categoria', 'NomCategoria']
      }]
    });
    res.json(data);
  } catch (e) { next(e); }
};
