import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/error-handler.js";
import { locationRouter } from "./routes/location.routes.js";
import { stayRouter } from "./routes/stay.routes.js";

export const app = express();

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
      locations: true,
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

app.use("/api/locations", locationRouter);
app.use("/api/stays", stayRouter);

app.use(errorHandler);
