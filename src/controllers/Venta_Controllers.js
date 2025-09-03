import * as model from "../models/Venta_Models.js";

export const list = async (_req, res, next) => {
  try { const [rows] = await model.findAllWithTotals(); res.json(rows); }
  catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const data = await model.findByIdWithItems(req.params.id);
    if (!data) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(data);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const { FechaVenta, items } = req.body;
    if (!FechaVenta || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: "FechaVenta e items son requeridos" });
    const result = await model.createWithItems({ FechaVenta, items });
    res.status(201).json(result);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try { await model.remove(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
