import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { Role } from "../generated/prisma/index.js";
import cloudinary from "../configs/cloudinary.configs.js";

const authService = new AuthService();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 1000 * 60 * 60, // 1 jam
};

export class AuthController {
  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password, refferal_code, role } = request.body;
      const file = request.file;

      if (!file) {
        return response.status(400).json({ message: "No image uploaded" });
      }

      // Upload ke Cloudinary
      const cloudinaryResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });

      const profilePic = cloudinaryResult.secure_url;

      // Simpan user ke database
      const user = await authService.registerUser({
        name,
        email,
        password,
        profilePic,
        role: role as Role, // enum
      });

      // Cek referral jika ada
      const isSuccess = await authService.checkReferal(refferal_code, user);

      return response.status(201).json({
        message: "User created successfully",
        user,
        referralSuccess: isSuccess,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body;

      const { accessToken } = await authService.loginUser(email, password);

      response.cookie("accessToken", accessToken, COOKIE_OPTIONS);

      return response
        .status(200)
        .json({ message: "Login successful", token: accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(request: Request, response: Response, next: NextFunction) {
    try {
      response
        .clearCookie("accessToken", COOKIE_OPTIONS)
        .status(200)
        .json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}
