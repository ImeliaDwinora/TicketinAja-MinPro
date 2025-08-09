import cron from "node-cron";
import { prisma } from "../configs/prisma.config";

// Fungsi untuk cancel transaksi yang expired (tanpa bayar setelah 2 menit)
export async function checkAndCancelExpiredTransactions() {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

  const expiredTransactions = await prisma.transaction.findMany({
    where: {
      status: "WAITING_PAYMENT",
      created_at: { lt: twoMinutesAgo },
    },
  });

  for (const txData of expiredTransactions) {
    await prisma.$transaction(async (tx) => {
      await tx.transaction.update({
        where: { id: txData.id },
        data: { status: "EXPIRED" },
      });

      await tx.ticket.update({
        where: { id: txData.ticketId },
        data: { stock: { increment: txData.quantity } },
      });

      if (txData.coupon_code) {
        await tx.coupon.updateMany({
          where: {
            code: txData.coupon_code,
            userId: txData.userId,
          },
          data: { is_used: false },
        });
      }
    });

    console.log(`[CRON] Canceled expired transaction: ${txData.id}`);
  }
}

// Fungsi untuk dijalankan pakai cron tiap 30 detik
export const startTransactionCleanupJob = () => {
  cron.schedule("*/30 * * * * *", checkAndCancelExpiredTransactions); // tiap 30 detik
};
