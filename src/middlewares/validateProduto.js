export function validateProduto(req, res, next) {
  const { nome, preco } = req.body;

  if (!nome || nome.trim() === "") {
    return next({ type: "validation", message: "Nome é obrigatório" });
  }

  if (preco == null || isNaN(preco) || Number(preco) <= 0) {
    return next({ type: "validation", message: "Preço deve ser maior que zero" });
  }

  next();
}
