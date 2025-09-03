import { Router } from "express";
import * as ctrl from "../controllers/Venta_Controllers.js";
const r = Router();
r.get("/", ctrl.list);
r.get("/:id", ctrl.getOne);
r.post("/", ctrl.create);
r.delete("/:id", ctrl.remove);
export default r;