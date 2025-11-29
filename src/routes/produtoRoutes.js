import express from "express";
import {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  deletarProduto
} from "../controllers/produtoController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { criarProdutoValidator, atualizarProdutoValidator, buscarProdutoValidator, deletarProdutoValidator } from "../validators/produtoValidator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

router.get("/", listarProdutos);
router.get("/:id", buscarProdutoValidator, validarCampos, buscarProduto);
router.post("/", authAdmin, criarProdutoValidator, validarCampos, criarProduto);
router.put("/:id", authAdmin, atualizarProdutoValidator, validarCampos, atualizarProduto);
router.delete("/:id", authAdmin, deletarProdutoValidator, validarCampos, deletarProduto);

export default router;