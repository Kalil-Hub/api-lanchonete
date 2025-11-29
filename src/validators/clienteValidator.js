import { body } from "express-validator";

export const validarRegistroCliente = [
  body("nome").notEmpty(),
  body("email").isEmail(),
  body("senha").isLength({ min: 6 })
];

export const validarLoginCliente = [
  body("email").isEmail(),
  body("senha").notEmpty()
];
