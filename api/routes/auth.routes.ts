import express from "express";

import { AuthController } from "../controllers/auth.controller";
import upload from "../middleware/multer";

const router = express.Router();
const authController = new AuthController();

router.post("/register", upload.single("profilePic"), authController.register);

router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);

export default router;
