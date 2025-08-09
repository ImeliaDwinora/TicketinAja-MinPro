import {
  createTransaction,
  paymentProofConfirmation,
  updateTransactionStatus,
} from "../controllers/transaction.controller";
import express from "express";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/", createTransaction);
router.post("/paymentproof", upload.single("image"), paymentProofConfirmation);

router.put("/:transactionId/status", updateTransactionStatus);

export default router;
