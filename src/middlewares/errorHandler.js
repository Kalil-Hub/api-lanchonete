export function errorHandler(err, req, res, next) {
  console.error("Erro:", err.message);

  if (err.type === "validation") {
    return res.status(400).json({
      error: err.message
    });
  }

  if (err.type === "not_found") {
    return res.status(404).json({
      error: err.message
    });
  }

  return res.status(500).json({
    error: "Erro interno no servidor"
  });
}
