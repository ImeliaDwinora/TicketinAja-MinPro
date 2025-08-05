import { prisma } from "../configs/prisma.config";
import { Request, Response } from "express";

export const createVoucher = async (req: Request, res: Response) => {
  try {
    const { code, discount, quota, start_date, end_date, eventId, userId } =
      req.body;

    const voucher = await prisma.voucher.create({
      data: {
        code,
        discount: Number(discount),
        quota: Number(quota),
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        eventId,
        userId: userId || null, // bisa null karena opsional
      },
    });

    res.status(201).json(voucher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create voucher" });
  }
};
