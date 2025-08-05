// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// import { prisma } from "../configs/prisma.config.js";
// // import { CreateUserInput } from "@/types/user.type.js";
// // import { generateReferralCode } from "@/utils/generate-code.js";
// // import { ReferralService } from "./referral.service.js";
// // import { AppError } from "@/errors/app.error.js";

// export class AuthService {
//   referralService = new ReferralService();

//   async isEmailTaken(email: string) {
//     const user = await prisma.user.findUnique({ where: { email } });
//     return Boolean(user);
//   }

//   async registerUser({
//     name,
//     email,
//     password,
//     profilePic,
//     referredReferralCode,
//   }: CreateUserInput) {
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         profilePic,
//         referralCode: generateReferralCode(name),
//       },
//       omit: { password: true },
//     });

//     if (referredReferralCode) {
//       await this.referralService.applyReferral(
//         referredReferralCode,
//         user.id,
//         user.name
//       );
//     }

//     return user;
//   }

//   async loginUser(email: string, password: string) {
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (!existingUser) {
//       throw new AppError("Invalid credentials", 401);
//     }

//     const isMatch = await bcrypt.compare(password, existingUser.password);
//     if (!isMatch) {
//       throw new AppError("Invalid credentials", 401);
//     }

//     const payload = {
//       id: existingUser.id,
//       name: existingUser.name,
//       email: existingUser.email,
//       role: existingUser.role,
//     };
//     const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
//       expiresIn: "1h",
//     });

//     return { user: existingUser, accessToken };
//   }
// }
