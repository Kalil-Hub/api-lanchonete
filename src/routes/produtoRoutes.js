import { Router } from "express";
import {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  deletarProduto
} from "../controllers/produtoController.js";

import { authAdmin } from "../middlewares/authAdmin.js";
import validar from "../middlewares/validationMiddleware.js";
import {
  criarProdutoValidator,
  atualizarProdutoValidator,
  buscarProdutoValidator,
  deletarProdutoValidator
} from "../validators/produtoValidator.js";

const router = Router();

router.get("/", listarProdutos);
router.get("/:id", buscarProdutoValidator, validar, buscarProduto);
router.post("/", authAdmin, criarProdutoValidator, validar, criarProduto);
router.put("/:id", authAdmin, atualizarProdutoValidator, validar, atualizarProduto);
router.delete("/:id", authAdmin, deletarProdutoValidator, validar, deletarProduto);

export default router;
