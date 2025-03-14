import express from "express";
import { createRole, getRoles } from "../controllers/role.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { can } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, can("CanManageRoles"), createRole);
router.get("/", authMiddleware, can("CanViewRoles"), getRoles);

export default router;
