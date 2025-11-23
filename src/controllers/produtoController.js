import Produto from "../models/produtoModel.js";

// Criar produto
export const criarProduto = async (req, res) => {
  try {
    const { nome, preco } = req.body;

    const novo = await Produto.create({ nome, preco });
    return res.status(201).json(novo);

  } catch (err) {
    return res.status(500).json({ erro: "Erro ao criar produto." });
  }
};

// Listar todos
export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    return res.status(200).json(produtos);

  } catch (err) {
    return res.status(500).json({ erro: "Erro ao listar produtos." });
  }
};

// Buscar por ID
export const buscarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findById(id);

    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    return res.status(200).json(produto);

  } catch (err) {
    return res.status(500).json({ erro: "Erro ao buscar produto." });
  }
};

// Atualizar
export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;

    const atualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, preco },
      { new: true }
    );

    if (!atualizado) return res.status(404).json({ erro: "Produto não encontrado." });

    return res.status(200).json(atualizado);

  } catch (err) {
    return res.status(500).json({ erro: "Erro ao atualizar produto." });
  }
};

// Deletar
export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const deletado = await Produto.findByIdAndDelete(id);

    if (!deletado) return res.status(404).json({ erro: "Produto não encontrado." });

    return res.status(204).send();

  } catch (err) {
    return res.status(500).json({ erro: "Erro ao deletar produto." });
  }
};
