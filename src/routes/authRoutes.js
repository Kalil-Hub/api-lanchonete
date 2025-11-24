import { Router } from "express";
import { loginAdmin } from "../controllers/adminAuthController.js";
import { loginCliente } from "../controllers/clienteAuthController.js";

const router = Router();

router.post("/admin/login", loginAdmin);
router.post("/cliente/login", loginCliente);

export default router;
