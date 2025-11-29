import { body } from "express-validator";

export const validarCriarPedido = [
  body("itens").isArray({ min: 1 }).withMessage("Itens devem ser um array"),
  body("itens.*.produto").notEmpty().withMessage("produto é obrigatório"),
  body("itens.*.quantidade").isInt({ min: 1 }).withMessage("quantidade inválida")
];
