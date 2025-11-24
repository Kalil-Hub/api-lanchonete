import { Router } from "express";
import { loginCliente, registrarCliente } from "../controllers/clienteAuthController.js";

const router = Router();

router.post("/register", registrarCliente);
router.post("/login", loginCliente);

export default router;
