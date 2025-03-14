import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { can } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/register", authMiddleware,can("canRegisterUser"), register);
//router.post("/register", register);
router.post("/login", login);

export default router;