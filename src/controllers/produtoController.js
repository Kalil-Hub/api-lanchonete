import Produto from "../models/produtoModel.js";

export const criarProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.json({ message: "Produto deletado" });
  } catch {
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
