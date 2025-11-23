import { Router } from "express";
import {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  deletarProduto
} from "../controllers/produtoController.js";

import { authAdmin } from "../middlewares/authAdmin.js";

const router = Router();

router.get("/", listarProdutos);
router.get("/:id", buscarProduto);
router.post("/", authAdmin, criarProduto);
router.put("/:id", authAdmin, atualizarProduto);
router.delete("/:id", authAdmin, deletarProduto);

export default router;
