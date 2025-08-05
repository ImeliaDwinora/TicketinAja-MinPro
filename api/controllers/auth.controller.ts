// import { Request, Response, NextFunction } from "express";

// import { AuthService } from "@/services/auth.service.js";

// const authService = new AuthService();
// const COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict" as const,
//   maxAge: 1000 * 60 * 60,
// };

// export class AuthController {
//   async register(request: Request, response: Response, next: NextFunction) {
//     try {
//       const { name, email, password, profilePic, referralCode } = request.body;

//       const user = await authService.registerUser({
//         name,
//         email,
//         password,
//         profilePic,
//         referredReferralCode: referralCode,
//       });

//       response.status(201).json({ message: "User created", user });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async login(request: Request, response: Response, next: NextFunction) {
//     try {
//       const { email, password } = request.body;

//       const { accessToken } = await authService.loginUser(email, password);

//       response.cookie("accessToken", accessToken, COOKIE_OPTIONS);
//       response.status(200).json({ message: "Logged in succesfully" });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async logout(request: Request, response: Response, next: NextFunction) {
//     response
//       .clearCookie("accessToken", COOKIE_OPTIONS)
//       .status(200)
//       .json({ message: "Logout successfully" });
//   }
// }
