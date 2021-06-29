import { Router } from "express";
import apiRoutes from "./api.routes";

const routes = Router();

routes.get("/", (req, res) => res.send("yey"));
routes.use("/api", apiRoutes);

export default routes;
