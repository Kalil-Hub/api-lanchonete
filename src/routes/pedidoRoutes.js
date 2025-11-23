import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
  atualizarPedido,
  deletarPedido
} from "../controllers/pedidoController.js";

const router = Router();

router.post("/", criarPedido);
router.get("/", listarPedidos);
router.put("/:id", atualizarPedido);
router.delete("/:id", deletarPedido);

export default router;
