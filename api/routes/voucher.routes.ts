import express from "express";
import {
  createVoucher,
  getVoucherByEventId,
} from "../controllers/voucher.controller";

const router = express.Router();

router.post("/", createVoucher);

router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const result = await getVoucherByEventId(eventId);
  if (result.status === "success") {
    res.json(result.data);
  } else if (result.status === "not_found") {
    res.status(404).json({ message: "Event not found" });
  } else {
    res.status(500).json({ message: result.message });
  }
});

export default router;
