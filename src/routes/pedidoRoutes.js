import { Router } from "express";
import { criarPedido, listarPedidos, buscarPedido, atualizarPedido, deletarPedido } from "../controllers/pedidoController.js";
import authCliente from "../middlewares/authCliente.js";
import authAdmin from "../middlewares/authAdmin.js";
import { validarPedido } from "../validators/pedidoValidator.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/", authCliente, validarPedido, validationMiddleware, criarPedido);

router.get("/", authCliente, listarPedidos);

// Buscar pedido
router.get("/:id", authCliente, buscarPedido);

router.put("/:id", authCliente, validarPedido, validationMiddleware, atualizarPedido);

router.delete("/:id", authAdmin, deletarPedido);

export default router;
