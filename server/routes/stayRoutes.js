import { Router } from "express";
import { searchStayController } from "../controllers/stayController.js";

const stayRoutes = Router();

stayRoutes.get("/search", searchStayController);

export default stayRoutes;
