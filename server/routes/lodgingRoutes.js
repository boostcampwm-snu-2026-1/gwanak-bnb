import express from "express";
import { searchLodgings, getAllLodgings } from "../controllers/lodgingController.js";

const router = express.Router();

router.get("/search", searchLodgings);
router.get("/all", getAllLodgings);

export default router;