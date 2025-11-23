import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
  buscarPedido,
  atualizarPedido,
  deletarPedido
} from "../controllers/pedidoController.js";

import { authCliente } from "../middlewares/authCliente.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { validarCriarPedido } from "../validators/pedidoValidator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.get("/", authAdmin, listarPedidos);
router.get("/:id", authAdmin, buscarPedido);
router.post("/", authCliente, validarCriarPedido, validarCampos, criarPedido);
router.put("/:id", authAdmin, atualizarPedido);
router.delete("/:id", authAdmin, deletarPedido);

export default router;
