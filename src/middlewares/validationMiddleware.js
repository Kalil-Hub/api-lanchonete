import { validationResult } from "express-validator";

export default function validar(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      erros: errors.array().map(err => ({
        campo: err.path,
        mensagem: err.msg
      }))
    });
  }
  next();
}
