import express, { Application } from "express";
import eventRoutes from "../routes/event.routes";
import cors from "cors";

export class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(cors({ origin: "http://localhost:3000" }));
    this.app.use(express.json());
  }

  setupRoutes() {
    this.app.use("/api/event", eventRoutes);
  }
  listen(port: string) {
    this.app.listen(port, () =>
      console.info(`Server is listening on port ${port}`)
    );
  }
}
