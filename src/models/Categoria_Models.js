import { pool } from "../config/databaseTienda.js";

export const findAll = () =>
  pool.query("SELECT * FROM Categoria ORDER BY NomCategoria");

export const findById = (id) =>
  pool.query("SELECT * FROM Categoria WHERE Id_Categoria=?", [id]);

export const create = (NomCategoria) =>
  pool.query("INSERT INTO Categoria (NomCategoria) VALUES (?)", [NomCategoria]);

export const update = (id, NomCategoria) =>
  pool.query("UPDATE Categoria SET NomCategoria=? WHERE Id_Categoria=?", [NomCategoria, id]);

export const remove = (id) =>
  pool.query("DELETE FROM Categoria WHERE Id_Categoria=?", [id]);