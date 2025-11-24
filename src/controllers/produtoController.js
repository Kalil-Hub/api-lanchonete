import Produto from "../models/produtoModel.js";

// Criar produto
export const criarProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    return res.status(201).json(produto);

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
    const produto = await Produto.findById(req.params.id);
    const { id } = req.params;
    const produto = await Produto.findById(id);

    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    return res.status(200).json(produto);

  } catch {
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao buscar produto." });
  }
};

// Atualizar
export const atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    return res.status(200).json(produto);

  } catch {
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
    const produto = await Produto.findByIdAndDelete(req.params.id);

    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    return res.status(204).send();

  } catch {
    const { id } = req.params;

    const deletado = await Produto.findByIdAndDelete(id);

    if (!deletado) return res.status(404).json({ erro: "Produto não encontrado." });

    return res.status(204).send();

  } catch (err) {
    return res.status(500).json({ erro: "Erro ao deletar produto." });
  }
};
