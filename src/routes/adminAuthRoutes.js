import { Router } from "express";
import { loginAdmin, registrarAdmin } from "../controllers/adminAuthController.js";

const router = Router();

router.post("/register", registrarAdmin);
router.post("/login", loginAdmin);

export default router;
