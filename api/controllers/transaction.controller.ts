import { NextFunction, Request, Response } from "express";

import { prisma } from "../configs/prisma.config";
import { orderQueue } from "../queues/transaction.queue";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { eventId, couponCode, customerId, quantity } = req.body;

    const order = await prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({ where: { id: eventId } });
      if (!event || event.availableSeats <= 0)
        throw new Error("No seats available");

      let coupon = null;
      if (couponCode) {
        console.log(couponCode);
        coupon = await tx.coupon.findFirst({
          where: { code: couponCode, customerId, isUsed: false },
        });
        if (!coupon) throw new Error("Invalid coupon");
      }

      const createdOrder = await tx.order.create({
        data: {
          customerId,
          eventId,
          couponId: coupon?.id,
          quantity,
          totalPrice: event.price.toNumber() * quantity,
        },
      });

      await tx.event.update({
        where: { id: eventId },
        data: { availableSeats: { decrement: 1 } },
      });

      if (coupon) {
        await tx.coupon.update({
          where: { id: coupon.id },
          data: {
            isUsed: true,
          },
        });
      }

      return createdOrder;
    });

    await orderQueue.add(
      "cancelOrder",
      { orderId: order.id },
      {
        delay: 2 * 60 * 1000,
        jobId: `cancelOrder-${order.id}`,
      }
    );

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");

    const orderStatus = await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: { status },
      });

      if (status === "REJECTED") {
        await tx.event.update({
          where: { id: order.eventId },
          data: { availableSeats: { increment: 1 } },
        });

        if (order.couponId) {
          await tx.coupon.update({
            where: { id: order.couponId },
            data: { isUsed: false },
          });
        }
      }
    });

    await orderQueue.remove(`cancelOrder-${orderId}`);

    res.status(200).json(orderStatus);
  } catch (error) {
    next(error);
  }
}
