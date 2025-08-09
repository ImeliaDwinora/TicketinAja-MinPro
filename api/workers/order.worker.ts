import { Worker } from "bullmq";
import { prisma } from "../configs/prisma.config.js";
import { redisConnection } from "../configs/redis.config.js";

const worker = new Worker(
  "orderQueue",
  async (job) => {
    if (job.name === "cancelOrder") {
      const { orderId } = job.data;

      const transaction = await prisma.transaction.findUnique({
        where: { id: orderId },
      });

      if (!transaction || transaction.status !== "WAITING_PAYMENT") return;

      await prisma.$transaction(async (tx) => {
        await tx.transaction.update({
          where: { id: orderId },
          data: { status: "EXPIRED" },
        });

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
      });

      console.log(`[BullMQ] Auto-expired transaction ${orderId}`);
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
