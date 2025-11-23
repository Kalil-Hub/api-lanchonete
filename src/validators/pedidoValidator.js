import { body } from "express-validator";

export const validarCriarPedido = [
  body("cliente").notEmpty(),
  body("itens").isArray({ min: 1 }),
  body("itens.*.produto").notEmpty(),
  body("itens.*.quantidade").isInt({ min: 1 }),
  body("total").isFloat({ min: 0 })
];
