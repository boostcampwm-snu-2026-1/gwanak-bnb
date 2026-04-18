import cors from "cors";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import env from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import stayRoutes from "./routes/stayRoutes.js";

const app = express();
const distPath = path.resolve(process.cwd(), "dist");
const indexPath = path.join(distPath, "index.html");

app.use(
  cors({
    origin: env.clientOrigin,
  }),
);
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.status(200).json({
    message: "ok",
  });
});

app.use("/api/stays", stayRoutes);

if (fs.existsSync(indexPath)) {
  app.use(express.static(distPath));

  app.get("*", (request, response, next) => {
    if (request.path.startsWith("/api/")) {
      next();
      return;
    }

    response.sendFile(indexPath);
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
