import { NextFunction, Request, Response } from "express";
import { prisma } from "../configs/prisma.config";
import { orderQueue } from "../queues/transaction.queue";
import cloudinary from "../configs/cloudinary.configs";

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, eventId, ticketId, quantity, finalPrice } = req.body;

    if (!userId || !eventId || !ticketId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({ where: { id: eventId } });
      if (!event) throw new Error("Event not found");

      const ticket = await tx.ticket.findUnique({ where: { id: ticketId } });
      if (!ticket || ticket.eventId !== eventId) {
        throw new Error("Ticket not found or doesn't match event");
      }

      if (ticket.stock < quantity) {
        throw new Error("Not enough ticket stock");
      }

      const totalPrice = ticket.price * quantity;

      const createdTransaction = await tx.transaction.create({
        data: {
          userId,
          eventId,
          ticketId,
          quantity,
          total_price: totalPrice,
          final_price: finalPrice,
          status: "WAITING_PAYMENT",
        },
      });

      await tx.ticket.update({
        where: { id: ticketId },
        data: { stock: { decrement: quantity } },
      });

      return createdTransaction;
    });

    await orderQueue.add(
      "cancelOrder",
      { orderId: transaction.id },
      {
        delay: 2 * 60 * 60 * 1000, // 2 hours
        jobId: `cancelOrder-${transaction.id}`,
      }
    );

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
}

export const paymentProofConfirmation = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { transactionId } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No image uploaded" });

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "events" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });

    const imageUrl = result.secure_url;
    const paymentProof = await prisma.paymentProof.create({
      data: {
        image_url: imageUrl,
        transactionId: transactionId,
      },
    });

    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: "WAITING_CONFIRMATION",
      },
    });

    return res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create transaction" });
  }
};

export async function updateTransactionStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Missing status" });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const updatedTransaction = await prisma.$transaction(async (tx) => {
      const result = await tx.transaction.update({
        where: { id: transactionId },
        data: { status },
      });

      const cancelStatuses = ["REJECTED", "CANCELED", "EXPIRED"];

      if (cancelStatuses.includes(status)) {
        await tx.ticket.update({
          where: { id: transaction.ticketId },
          data: { stock: { increment: transaction.quantity } },
        });

        if (transaction.coupon_code) {
          await tx.coupon.updateMany({
            where: {
              code: transaction.coupon_code,
              userId: transaction.userId,
            },
            data: { is_used: false },
          });
        }
      }

      return result;
    });

    await orderQueue.remove(`cancelOrder-${transactionId}`);

    res.status(200).json(updatedTransaction);
  } catch (error) {
    next(error);
  }
}
