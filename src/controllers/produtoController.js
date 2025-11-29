import Produto from "../models/produtoModel.js";

export const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, imagem, estoque } = req.body;
    const existe = await Produto.findOne({ nome });
    if (existe) return res.status(409).json({ error: "Já existe um produto com esse nome" });

    const produto = await Produto.create({ nome, descricao, preco, imagem, estoque });
    return res.status(201).json(produto);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao criar produto" });
  }
};

export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ createdAt: -1 });
    return res.status(200).json(produtos);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao listar produtos" });
  }
};

export const buscarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    return res.status(200).json(produto);
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    return res.status(200).json(produto);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar produto" });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "Erro ao deletar produto" });
  }
};
