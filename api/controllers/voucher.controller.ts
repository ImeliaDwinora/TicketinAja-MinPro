import { prisma } from "../configs/prisma.config";
import { Request, Response } from "express";

export const createVoucher = async (req: Request, res: Response) => {
  try {
    const { code, discount, quota, start_date, end_date, eventId } = req.body;

    const voucher = await prisma.voucher.create({
      data: {
        code,
        discount: Number(discount),
        quota: Number(quota),
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        eventId,
      },
    });

    res.status(201).json(voucher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create voucher" });
  }
};

export async function getVoucherByEventId(eventId: string) {
  try {
    const voucher = await prisma.voucher.findMany({
      where: { eventId },
    });
    if (!voucher) {
      return { status: "not_found", message: "Event not found" };
    }
    return { status: "success", data: voucher };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}
