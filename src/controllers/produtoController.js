import Produto from '../models/produtoModel.js';

export const listarProdutos = async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
};

export const criarProduto = async (req, res) => {
  const produto = await Produto.create(req.body);
  res.status(201).json(produto);
};

export const atualizarProduto = async (req, res) => {
  const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(produto);
};

export const excluirProduto = async (req, res) => {
  const produto = await Produto.findByIdAndDelete(req.params.id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json({ message: 'Produto removido' });
};
