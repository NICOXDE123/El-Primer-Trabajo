import { pool } from "../config/databaseTienda.js";

export const findAllWithTotals = () =>
  pool.query(
    `SELECT v.Id_Venta, v.FechaVenta,
            COALESCE(SUM(dv.PrecioUnit * dv.Cantidad), 0)                    AS TotalVenta,
            COALESCE(SUM((dv.PrecioUnit - p.PrecioCompra) * dv.Cantidad),0)  AS MargenVenta
     FROM Venta v
     LEFT JOIN DetalleVenta dv ON dv.Id_Venta = v.Id_Venta
     LEFT JOIN Producto p       ON p.Id_Producto = dv.Id_Producto
     GROUP BY v.Id_Venta, v.FechaVenta
     ORDER BY v.FechaVenta, v.Id_Venta`
  );

export const findByIdWithItems = async (id) => {
  const [[venta]] = await pool.query("SELECT * FROM Venta WHERE Id_Venta=?", [id]);
  if (!venta) return null;

  const [items] = await pool.query(
    `SELECT dv.Id_Detalle, dv.Id_Producto, p.NomProducto, dv.Cantidad, dv.PrecioUnit,
            (dv.PrecioUnit * dv.Cantidad)                              AS Subtotal,
            ((dv.PrecioUnit - p.PrecioCompra) * dv.Cantidad)           AS MargenLinea
     FROM DetalleVenta dv
     JOIN Producto p ON p.Id_Producto = dv.Id_Producto
     WHERE dv.Id_Venta=?
     ORDER BY dv.Id_Detalle`,
    [id]
  );
  return { venta, items };
};

export const remove = (id) =>
  pool.query("DELETE FROM Venta WHERE Id_Venta=?", [id]);

/** Crea venta + detalles en transacción */
export const createWithItems = async ({ FechaVenta, items }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [vr] = await conn.query("INSERT INTO Venta (FechaVenta) VALUES (?)", [FechaVenta]);
    const Id_Venta = vr.insertId;

    const sql =
      "INSERT INTO DetalleVenta (Id_Venta, Id_Producto, Cantidad, PrecioUnit) VALUES (?,?,?,?)";

    for (const it of items) {
      await conn.query(sql, [Id_Venta, it.Id_Producto, it.Cantidad, it.PrecioUnit]);
    }

    await conn.commit();
    return { Id_Venta, lineas: items.length };
  } catch (err) {
    try { await conn.rollback(); } catch {}
    throw err;
  } finally {
    conn.release();
  }
};