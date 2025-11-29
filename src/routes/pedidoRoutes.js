import express from "express";
import {
  criarPedido,
  listarPedidos,
  listarPedidosCliente,
  atualizarPedido,
  deletarPedido
} from "../controllers/pedidoController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
import { validarCriarPedido } from "../validators/pedidoValidator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

router.post("/", auth, validarCriarPedido, validarCampos, criarPedido);
router.get("/", authAdmin, listarPedidos);
router.get("/meus", auth, listarPedidosCliente);
router.put("/:id", authAdmin, atualizarPedido);
router.delete("/:id", authAdmin, deletarPedido);

export default router;
