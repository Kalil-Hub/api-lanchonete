import { body, param } from "express-validator";

export const criarProdutoValidator = [
  body("nome").notEmpty().isString(),
  body("preco").notEmpty().isFloat({ gt: 0 }),
  body("estoque").optional().isInt({ min: 0 })
];

export const atualizarProdutoValidator = [
  param("id").isMongoId(),
  body("nome").optional().isString(),
  body("preco").optional().isFloat({ gt: 0 }),
  body("estoque").optional().isInt({ min: 0 })
];

export const buscarProdutoValidator = [
  param("id").isMongoId()
];

export const deletarProdutoValidator = [
  param("id").isMongoId()
];
