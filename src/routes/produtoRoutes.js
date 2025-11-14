import express from "express";
import {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  deletarProduto,
} from "../controllers/produtoController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", listarProdutos);
router.get("/:id", buscarProduto);

router.post("/", authMiddleware, criarProduto);
router.put("/:id", authMiddleware, atualizarProduto);
router.delete("/:id", authMiddleware, deletarProduto);

export default router;
