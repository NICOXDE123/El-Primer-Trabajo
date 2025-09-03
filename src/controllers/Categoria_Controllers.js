import * as model from "src/models/Categoria_Models.js";

export const list = async (_req, res, next) => {
  try { const [rows] = await model.findAll(); res.json(rows); }
  catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const [rows] = await model.findById(req.params.id);
    if (!rows.length) return res.status(404).json({ error: "No encontrada" });
    res.json(rows[0]);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const { NomCategoria } = req.body;
    if (!NomCategoria) return res.status(400).json({ error: "NomCategoria es requerido" });
    const [rs] = await model.create(NomCategoria);
    res.status(201).json({ Id_Categoria: rs.insertId, NomCategoria });
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    await model.update(req.params.id, req.body.NomCategoria);
    res.json({ ok: true });
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try { await model.remove(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
