import express from "express";
import {
  criarPedido,
  listarPedidos,
<<<<<<< Updated upstream
=======
  listarPedidosCliente,
>>>>>>> Stashed changes
  atualizarPedido,
  deletarPedido
} from "../controllers/pedidoController.js";

<<<<<<< Updated upstream
import { authCliente } from "../middlewares/authCliente.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = express.Router();

router.post("/", authCliente, criarPedido);
router.get("/", authAdmin, listarPedidos);
=======
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

router.post("/", auth, criarPedido);
router.get("/", authAdmin, listarPedidos);
router.get("/meus", auth, listarPedidosCliente);
>>>>>>> Stashed changes
router.put("/:id", authAdmin, atualizarPedido);
router.delete("/:id", authAdmin, deletarPedido);

export default router;
