import { Router } from "express";
import { loginAdmin, registrarAdmin } from "../controllers/adminAuthController.js";
import { validarRegistroAdmin, validarLoginAdmin } from "../validators/adminValidator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.post("/register", validarRegistroAdmin, validarCampos, registrarAdmin);
router.post("/login", validarLoginAdmin, validarCampos, loginAdmin);

export default router;
