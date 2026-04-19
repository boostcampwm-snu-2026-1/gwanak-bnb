import cors from "cors";
import express from "express";

import type { DatabaseCollections } from "./database/mongo.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { createStayRouter } from "./routes/stay.routes.js";

export const createApp = (collections: DatabaseCollections) => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
  });

  app.get("/api/ping", (_request, response) => {
    response.status(200).json({
      message: "pong",
      routes: {
        health: true,
        stays: true,
      },
    });
  });

  app.get("/api/pingpong", (_request, response) => {
    response.status(200).json({
      ping: "pong",
      service: "gwanak-bnb-api",
      hasStaySearchRoute: true,
    });
  });

  app.use("/api/stays", createStayRouter(collections));

  app.use(errorHandler);

  return app;
};
