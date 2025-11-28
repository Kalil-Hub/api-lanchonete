import express from "express";
import {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  deletarProduto,
  buscarProduto
} from "../controllers/produtoController.js";

<<<<<<< Updated upstream
import { authAdmin } from "../middlewares/authAdmin.js";
=======
import authAdmin from "../middlewares/authAdmin.js";

import {
  criarProdutoValidator,
  atualizarProdutoValidator,
  deletarProdutoValidator
} from "../validators/produtoValidator.js";
>>>>>>> Stashed changes

import { validar } from "../validators/validar.js";

const router = express.Router();

router.get("/", listarProdutos);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
router.get("/:id", buscarProdutoValidator, validar, buscarProduto);
router.post("/", authAdmin, criarProdutoValidator, validar, criarProduto);
router.put("/:id", authAdmin, atualizarProdutoValidator, validar, atualizarProduto);
router.delete("/:id", authAdmin, deletarProdutoValidator, validar, deletarProduto);
const router = express.Router();
router.get("/", listarProdutos);
router.get("/:id", buscarProduto);
router.post("/", criarProduto);
router.put("/:id", atualizarProduto);
router.delete("/:id", deletarProduto);

=======
router.get("/:id", buscarProduto);
router.post("/", authAdmin, criarProduto);
router.put("/:id", authAdmin, atualizarProduto);
router.delete("/:id", authAdmin, deletarProduto);
>>>>>>> parent of a549546 (Realiznaod totalmente a autenticação e melhorando a segurança)
=======
router.get("/:id", buscarProduto);

router.post("/", authAdmin, criarProdutoValidator, validar, criarProduto);
router.put("/:id", authAdmin, atualizarProdutoValidator, validar, atualizarProduto);
router.delete("/:id", authAdmin, deletarProdutoValidator, validar, deletarProduto);
>>>>>>> Stashed changes
=======
router.get("/:id", buscarProduto);

router.post("/", authAdmin, criarProdutoValidator, validar, criarProduto);
router.put("/:id", authAdmin, atualizarProdutoValidator, validar, atualizarProduto);
router.delete("/:id", authAdmin, deletarProdutoValidator, validar, deletarProduto);
>>>>>>> Stashed changes

export default router;
