import { Router } from "express";
import { search, recentSearches } from "../controllers/api.controller";

const apiRoutes = Router();

apiRoutes.get("/", search);
apiRoutes.post("/", recentSearches);

export default apiRoutes;
