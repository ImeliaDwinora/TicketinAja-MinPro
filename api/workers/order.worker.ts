import { Worker } from "bullmq";

import { prisma } from "../configs/prisma.config.js";
import { redisConnection } from "../configs/redis.config.js";

const worker = new Worker(
  "orderQueue",
  async (job) => {
    if (job.name === "cancelOrder") {
      const { orderId } = job.data;

      const order = await prisma.transaction.findUnique({
        where: { id: orderId },
      });
      if (!order || order.status !== "PENDING") return;

      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: orderId },
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

      console.log(`[BullMQ] Auto-canceled order ${orderId}`);
    }
  },
  { connection: redisConnection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});
