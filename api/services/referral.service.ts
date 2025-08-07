import { prisma } from "../configs/prisma.config.js";
import { AppError } from "../errors/app.error.js";
import { generateCouponCode } from "../utils/generate-code.js";

export class ReferralService {
  async applyReferral(
    refferal_code: string,
    newUserId: string,
    newUsername: string
  ) {
    const referredUser = await prisma.user.findUnique({
      where: { refferal_code },
    });
    if (!referredUser) return false;

    await prisma.$transaction(async (tx) => {
      const threeMonthsFromNow = new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 30 * 3
      );

      await tx.point.create({
        data: {
          userId: referredUser.id,
          amount: 10000,
          expired_at: threeMonthsFromNow,
        },
      });

      await tx.coupon.create({
        data: {
          userId: newUserId,
          code: generateCouponCode(newUsername),
          discount: 5,
          expired_at: threeMonthsFromNow,
        },
      });
    });
    return true;
  }
}
