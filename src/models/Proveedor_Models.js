import { pool } from "../config/databaseTienda.js";

export const findAll = () =>
  pool.query("SELECT * FROM Proveedor ORDER BY NomProveedor");

export const findById = (id) =>
  pool.query("SELECT * FROM Proveedor WHERE Id_Proveedor=?", [id]);

export const create = ({ NomProveedor, Telefono=null, Email=null, Contacto=null }) =>
  pool.query(
    "INSERT INTO Proveedor (NomProveedor, Telefono, Email, Contacto) VALUES (?,?,?,?)",
    [NomProveedor, Telefono, Email, Contacto]
  );

export const update = (id, { NomProveedor, Telefono, Email, Contacto }) =>
  pool.query(
    `UPDATE Proveedor
     SET NomProveedor=?, Telefono=?, Email=?, Contacto=?
     WHERE Id_Proveedor=?`,
    [NomProveedor, Telefono, Email, Contacto, id]
  );

export const remove = (id) =>
  pool.query("DELETE FROM Proveedor WHERE Id_Proveedor=?", [id]);