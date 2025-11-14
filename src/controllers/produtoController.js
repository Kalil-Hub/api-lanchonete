import Produto from "../models/produtoModel.js";

export const criarProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    return res.status(201).json(produto);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ createdAt: -1 });
    return res.status(200).json(produtos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const buscarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    return res.status(200).json(produto);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    return res.status(200).json(produto);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
