// import { NextFunction, Request, Response } from "express";

// import { AppError } from "@/errors/app.error.js";
// import jwt from "jsonwebtoken";

// export function verifyToken(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   try {
//     const accessToken = request.cookies.accessToken;
//     console.log(accessToken);
//     if (!accessToken) {
//       throw new AppError("Unauthorized. Missing required token", 401);
//     }

//     const payload = jwt.verify(
//       accessToken,
//       process.env.JWT_SECRET as string
//     ) as {
//       id: number;
//       name: string;
//       email: string;
//       role: string;
//     };
//     request.user = payload;

//     next();
//   } catch (error) {
//     next(error);
//   }
// } // already login?

// export function roleGuard(...allowedRoles: string[]) {
//   return function (request: Request, response: Response, next: NextFunction) {
//     const userRole = request?.user?.role;

//     if (!userRole || !allowedRoles.includes(userRole)) {
//       throw new AppError("Forbidden. Access denied", 403);
//     }

//     next();
//   };
// } // have access?
