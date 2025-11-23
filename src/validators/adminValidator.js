import { body } from "express-validator";

export const validarRegistroAdmin = [
  body("nome").notEmpty(),
  body("email").isEmail(),
  body("senha").isLength({ min: 6 })
];

export const validarLoginAdmin = [
  body("email").isEmail(),
  body("senha").notEmpty()
];
