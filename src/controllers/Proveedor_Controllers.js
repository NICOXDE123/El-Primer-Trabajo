import * as model from "src/models/Proveedor_Models.js";

export const list = async (_req, res, next) => {
  try { const [rows] = await model.findAll(); res.json(rows); }
  catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const [rows] = await model.findById(req.params.id);
    if (!rows.length) return res.status(404).json({ error: "No encontrado" });
    res.json(rows[0]);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const { NomProveedor } = req.body;
    if (!NomProveedor) return res.status(400).json({ error: "NomProveedor es requerido" });
    const [rs] = await model.create(req.body);
    res.status(201).json({ Id_Proveedor: rs.insertId, ...req.body });
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try { await model.update(req.params.id, req.body); res.json({ ok: true }); }
  catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try { await model.remove(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
