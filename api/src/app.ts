import express, { Application } from "express";
import eventRoutes from "../routes/event.routes";
import voucherRoutes from "../routes/voucher.routes";
import reviewRoutes from "../routes/review.routes";
import authRoutes from "../routes/auth.routes";
import ticketRoutes from "../routes/ticket.routes";
import cors from "cors";

export class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    this.app.use(express.json());
  }

  setupRoutes() {
    this.app.use("/api/event", eventRoutes);
    this.app.use("/api/voucher", voucherRoutes);
    this.app.use("/api/reviews", reviewRoutes);
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/ticket", ticketRoutes);
  }
  listen(port: string) {
    this.app.listen(port, () =>
      console.info(`Server is listening on port ${port}`)
    );
  }
}
