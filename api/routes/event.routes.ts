import express from "express";
import { getAllEvents } from "../controllers/event.controller";
import { getEventById } from "../controllers/event.controller";
import { createEvent } from "../controllers/event.controller";
import upload from "../middleware/multer";

const router = express.Router();

// GET /events
// router.route("/").get(async (req, res) => {
//   const result = await getAllEvents();
//   if (result.status === "success") {
//     res.json(result.data);
//   } else {
//     res.status(500).json({ message: result.message });
//   }
// });
router.route("/").get(getAllEvents);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getEventById(id);
  if (result.status === "success") {
    res.json(result.data);
  } else if (result.status === "not_found") {
    res.status(404).json({ message: "Event not found" });
  } else {
    res.status(500).json({ message: result.message });
  }
});

router.post("/", upload.single("image"), createEvent);

export default router;
