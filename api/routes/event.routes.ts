import express from "express";
import { getAllEvents } from "../controllers/event.controller";

const router = express.Router();

// GET /events
router.route("/").get(async (req, res) => {
  const result = await getAllEvents();
  if (result.status === "success") {
    res.json(result.data);
  } else {
    res.status(500).json({ message: result.message });
  }
});

export default router;
