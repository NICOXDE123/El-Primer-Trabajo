import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import categoriaRoutes from "./routes/Categoria_Routes.js";
import proveedorRoutes from "./routes/Proveedor_Routes.js";
import productoRoutes from "./routes/Producto_Routes.js";
import ventaRoutes from "./routes/Venta_Routes.js";
import detalleVentaRoutes from "./routes/DetalleVenta_Routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// rutas
app.use("/api/categorias", categoriaRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/detalle-ventas", detalleVentaRoutes);

// errores
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API lista en http://localhost:${port}`));