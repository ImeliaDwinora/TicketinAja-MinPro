// controllers/review.controller.ts
import { Request, Response } from "express";
import { prisma } from "../configs/prisma.config";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      include: { user: true, event: true },
      orderBy: { created_at: "desc" },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
