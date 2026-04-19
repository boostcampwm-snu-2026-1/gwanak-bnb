import { Router } from "express";

import type { DatabaseCollections } from "../database/mongo.js";
import { StayController } from "../controllers/stay.controller.js";
import { StayRepository } from "../repositories/stay.repository.js";
import { StayService } from "../services/stay.service.js";

export const createStayRouter = ({ stays }: DatabaseCollections) => {
  const stayRepository = new StayRepository(stays);
  const stayService = new StayService(stayRepository);
  const stayController = new StayController(stayService);
  const stayRouter = Router();

  stayRouter.get("/search", stayController.search);

  return stayRouter;
};
