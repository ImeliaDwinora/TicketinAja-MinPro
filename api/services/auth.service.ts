import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../configs/prisma.config.js";
import { CreateUserInput } from "../types/user.types.js";
import { generateReferralCode } from "../utils/generate-code.js";
import { ReferralService } from "./referral.service.js";
import { AppError } from "../errors/app.error.js";
import { Role } from "../generated/prisma/index.js";

export class AuthService {
  referralService = new ReferralService();

  async isEmailTaken(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return Boolean(user);
  }

  async registerUser({
    name,
    email,
    password,
    profilePic,
    role,
  }: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePic,
        role,
        refferal_code: role === "USER" ? generateReferralCode(name) : null,
      },
      omit: { password: true },
    });

    return user;
  }

  async checkReferal(refferal_code: string, user: any) {
    if (refferal_code) {
      const isValid = await this.referralService.applyReferral(
        refferal_code,
        user.id,
        user.name
      );
      console.log("hehe");
      return isValid;
    }
    console.log("hihi");
    return false;
  }

  async loginUser(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return { user: existingUser, accessToken };
  }
}
