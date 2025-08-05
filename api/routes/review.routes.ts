// routes/review.route.ts
import express from "express";
import { getAllReviews } from "../controllers/review.controller";

const router = express.Router();

router.get("/", getAllReviews);

export default router;
