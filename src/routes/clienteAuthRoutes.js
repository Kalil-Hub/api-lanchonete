import { Router } from "express";
import { registrarCliente, loginCliente } from "../controllers/clienteAuthController.js";

const router = Router();

router.post("/register", registrarCliente);
router.post("/login", loginCliente);

export default router;
