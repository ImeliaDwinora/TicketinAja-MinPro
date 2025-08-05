import express from "express";
import { createVoucher } from "../controllers/voucher.controller";

const router = express.Router();

router.post("/", createVoucher);

export default router;
