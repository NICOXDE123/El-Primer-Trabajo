import * as model from "src/models/DetalleVenta_Models.js";

export const list = async (req, res, next) => {
  try {
    // Soporta filtro por venta: /api/detalle-ventas?venta=123
    const { venta } = req.query;
    if (venta) {
      const [rows] = await model.findByVenta(venta);
      return res.json(rows);
    }
    const [rows] = await model.findAll();
    res.json(rows);
  } catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const [rows] = await model.findById(req.params.id);
    if (!rows.length) return res.status(404).json({ error: "Detalle no encontrado" });
    res.json(rows[0]);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const { Id_Venta, Id_Producto, Cantidad, PrecioUnit } = req.body;
    if (!Id_Venta || !Id_Producto || !Cantidad || !PrecioUnit)
      return res.status(400).json({ error: "Id_Venta, Id_Producto, Cantidad y PrecioUnit son requeridos" });

    if (+Cantidad <= 0) return res.status(400).json({ error: "Cantidad debe ser > 0" });
    if (+PrecioUnit < 0) return res.status(400).json({ error: "PrecioUnit no puede ser negativo" });

    const [rs] = await model.create({ Id_Venta, Id_Producto, Cantidad, PrecioUnit });
    res.status(201).json({ Id_Detalle: rs.insertId, Id_Venta, Id_Producto, Cantidad, PrecioUnit });
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    const { Id_Venta, Id_Producto, Cantidad, PrecioUnit } = req.body;
    if (!Id_Venta || !Id_Producto || !Cantidad || !PrecioUnit)
      return res.status(400).json({ error: "Id_Venta, Id_Producto, Cantidad y PrecioUnit son requeridos" });

    await model.update(req.params.id, { Id_Venta, Id_Producto, Cantidad, PrecioUnit });
    res.json({ ok: true });
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    await model.remove(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
};