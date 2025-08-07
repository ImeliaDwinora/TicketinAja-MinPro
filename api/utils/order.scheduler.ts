import cron from "node-cron";

import { prisma } from "../configs/prisma.config";

export async function checkAndCancelExpiredOrders() {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

  const expiredOrders = await prisma.transaction.findMany({
    where: {
      status: "PENDING",
      createdAt: { lt: twoMinutesAgo },
    },
  });

  for (const order of expiredOrders) {
    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: { status: "CANCELED" },
      });

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
    });

    console.log(`Canceled expired order: ${order.id}`);
  }
}

const cancelExpiredOrders = async () => {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

  const expiredOrders = await prisma.order.findMany({
    where: {
      status: "PENDING",
      createdAt: { lt: twoMinutesAgo },
    },
  });

  for (const order of expiredOrders) {
    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: { status: "CANCELED" },
      });

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
    });

    console.log(`[CRON] Canceled expired order: ${order.id}`);
  }
};

export const startOrderCleanupJob = () => {
  cron.schedule("*/30 * * * * *", cancelExpiredOrders); // Every 30 seconds
};
