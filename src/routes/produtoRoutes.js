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

export default router;
