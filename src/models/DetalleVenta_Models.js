import { pool } from "../config/databaseTienda.js";

export const findAll = () =>
  pool.query(
    `SELECT dv.*, p.NomProducto
     FROM DetalleVenta dv
     JOIN Producto p ON p.Id_Producto = dv.Id_Producto
     ORDER BY dv.Id_Detalle`
  );

export const findById = (id) =>
  pool.query(
    `SELECT dv.*, p.NomProducto
     FROM DetalleVenta dv
     JOIN Producto p ON p.Id_Producto = dv.Id_Producto
     WHERE dv.Id_Detalle=?`,
    [id]
  );

export const findByVenta = (idVenta) =>
  pool.query(
    `SELECT dv.*, p.NomProducto
     FROM DetalleVenta dv
     JOIN Producto p ON p.Id_Producto = dv.Id_Producto
     WHERE dv.Id_Venta=?
     ORDER BY dv.Id_Detalle`,
    [idVenta]
  );

export const create = ({ Id_Venta, Id_Producto, Cantidad, PrecioUnit }) =>
  pool.query(
    `INSERT INTO DetalleVenta (Id_Venta, Id_Producto, Cantidad, PrecioUnit)
     VALUES (?,?,?,?)`,
    [Id_Venta, Id_Producto, Cantidad, PrecioUnit]
  );

export const update = (id, { Id_Venta, Id_Producto, Cantidad, PrecioUnit }) =>
  pool.query(
    `UPDATE DetalleVenta
     SET Id_Venta=?, Id_Producto=?, Cantidad=?, PrecioUnit=?
     WHERE Id_Detalle=?`,
    [Id_Venta, Id_Producto, Cantidad, PrecioUnit, id]
  );

export const remove = (id) =>
  pool.query("DELETE FROM DetalleVenta WHERE Id_Detalle=?", [id]);