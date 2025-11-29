import { body, param } from "express-validator";

export const criarProdutoValidator = [
  body("nome").notEmpty().withMessage("Nome é obrigatório"),
  body("preco").isFloat({ min: 0 }).withMessage("Preço inválido")
];

export const atualizarProdutoValidator = [
  param("id").isMongoId().withMessage("ID inválido"),
  body("nome").optional().notEmpty(),
  body("preco").optional().isFloat({ min: 0 })
];

export const buscarProdutoValidator = [
  param("id").isMongoId().withMessage("ID inválido")
];

export const deletarProdutoValidator = [
  param("id").isMongoId().withMessage("ID inválido")
];
