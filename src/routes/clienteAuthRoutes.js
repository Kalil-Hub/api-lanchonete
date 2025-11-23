import { Router } from "express";
import { loginCliente, registrarCliente } from "../controllers/clienteAuthController.js";
import { validarRegistroCliente, validarLoginCliente } from "../validators/clienteValidator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.post("/register", validarRegistroCliente, validarCampos, registrarCliente);
router.post("/login", validarLoginCliente, validarCampos, loginCliente);

export default router;
