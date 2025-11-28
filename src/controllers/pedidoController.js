import Pedido from "../models/pedidoModel.js";
import Produto from "../models/produtoModel.js";
import Cliente from "../models/clienteModel.js";

export const criarPedido = async (req, res) => {
  try {
    const { itens } = req.body;
    const clienteId = req.userId;

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

    let total = 0;

    for (const item of itens) {
      const produto = await Produto.findById(item.produto);
      if (!produto) continue;
      total += produto.preco * item.quantidade;
    }

    const pedido = await Pedido.create({
      clienteId,
      itens,
      total
    });

    res.status(201).json(pedido);
  } catch {
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("clienteId", "nome email")
      .populate("itens.produto", "nome preco");

    res.json(pedidos);
  } catch {
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
};

export const listarPedidosCliente = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ clienteId: req.userId })
      .populate("itens.produto", "nome preco");

    res.json(pedidos);
  } catch {
    res.status(500).json({ error: "Erro ao buscar pedidos do cliente" });
  }
};

export const atualizarPedido = async (req, res) => {
  try {
    const { itens, status } = req.body;

    const updateData = {};
    let total = 0;

    if (itens) {
      for (const item of itens) {
        const produto = await Produto.findById(item.produto);
        if (!produto) continue;
        total += produto.preco * item.quantidade;
      }

      updateData.itens = itens;
      updateData.total = total;
    }

    if (status) updateData.status = status;

    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });

    res.json(pedido);
  } catch {
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
};

export const deletarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });

    res.json({ message: "Pedido deletado com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
};