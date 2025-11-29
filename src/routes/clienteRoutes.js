import express from "express";
import { criarCliente, listarClientes } from "../controllers/clienteController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { validarRegistroCliente } from "../validators/clienteValidator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

router.post("/", validarRegistroCliente, validarCampos, criarCliente);
router.get("/", authAdmin, listarClientes);

export default router;
