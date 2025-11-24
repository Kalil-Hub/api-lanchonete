import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
  atualizarPedido,
  deletarPedido
} from "../controllers/pedidoController.js";

import { authCliente } from "../middlewares/authCliente.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = Router();

router.post("/", authCliente, criarPedido);
router.get("/", authAdmin, listarPedidos);
router.put("/:id", authAdmin, atualizarPedido);
router.delete("/:id", authAdmin, deletarPedido);
const router = Router();

router.post("/", criarPedido);
router.get("/", listarPedidos);
router.put("/:id", atualizarPedido);
router.delete("/:id", deletarPedido);

export default router;
