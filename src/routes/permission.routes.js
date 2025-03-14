import express from "express";
import { createPermission, getPermissions } from "../controllers/permission.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { can } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, can("CanManagePermissions"), createPermission);
router.get("/", authMiddleware, can("CanViewPermissions"), getPermissions);

export default router;
