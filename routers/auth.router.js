import express from "express";
import { changePassword, forgotPassword, login, register, verifyToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.put("/change-password", changePassword)
router.get("/verify-token", verifyToken)

export default router;