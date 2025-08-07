import {
  createOrder,
  updateOrderStatus,
} from "../controllers/transaction.controller";
import express from "express";

const router = express.Router();

router.post("/", createOrder);
router.put("/:orderId/status", updateOrderStatus);

export default router;
