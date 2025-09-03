import { pool } from "../config/databaseTienda.js";

export const findAll = () =>
  pool.query(
    `SELECT p.*, c.NomCategoria, pr.NomProveedor
     FROM Producto p
     JOIN Categoria c  ON c.Id_Categoria = p.Id_Categoria
     JOIN Proveedor pr ON pr.Id_Proveedor = p.Id_Proveedor
     ORDER BY p.NomProducto`
  );

export const findById = (id) =>
  pool.query("SELECT * FROM Producto WHERE Id_Producto=?", [id]);

export const create = ({ NomProducto, Id_Categoria, Id_Proveedor, PrecioCompra=0, PrecioVenta=0 }) =>
  pool.query(
    `INSERT INTO Producto (NomProducto, Id_Categoria, Id_Proveedor, PrecioCompra, PrecioVenta)
     VALUES (?,?,?,?,?)`,
    [NomProducto, Id_Categoria, Id_Proveedor, PrecioCompra, PrecioVenta]
  );

export const update = (id, { NomProducto, Id_Categoria, Id_Proveedor, PrecioCompra, PrecioVenta }) =>
  pool.query(
    `UPDATE Producto
     SET NomProducto=?, Id_Categoria=?, Id_Proveedor=?, PrecioCompra=?, PrecioVenta=?
     WHERE Id_Producto=?`,
    [NomProducto, Id_Categoria, Id_Proveedor, PrecioCompra, PrecioVenta, id]
  );

export const remove = (id) =>
  pool.query("DELETE FROM Producto WHERE Id_Producto=?", [id]);