import express, { Application } from "express";
import eventRoutes from "../routes/event.routes";
import voucherRoutes from "../routes/voucher.routes";
import reviewRoutes from "../routes/review.routes";
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
    this.app.use("/api/voucher", voucherRoutes);
    this.app.use("/api/reviews", reviewRoutes);
  }
  listen(port: string) {
    this.app.listen(port, () =>
      console.info(`Server is listening on port ${port}`)
    );
  }
}
