import Pedido from "../models/pedidoModel.js";
import Produto from "../models/produtoModel.js";
import Cliente from "../models/clienteModel.js";

export const criarPedido = async (req, res) => {
  try {
    const { itens } = req.body;
    const clienteId = req.userId || req.body.cliente; // cliente vindo do token ou body (tests)

    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: "Itens do pedido inválidos" });
    }

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

    let total = 0;
    const itensProcessados = [];

    for (const item of itens) {
      const produtoId = item.produto || item.produtoId;
      const produto = await Produto.findById(produtoId);
      if (!produto) return res.status(404).json({ error: `Produto não encontrado: ${produtoId}` });

      const quantidade = Number(item.quantidade) || 1;
      total += produto.preco * quantidade;
      itensProcessados.push({ produto: produto._id, quantidade });
    }

    const pedido = await Pedido.create({
      cliente: cliente._id,
      itens: itensProcessados,
      total
    });

    res.status(201).json(pedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("cliente", "nome email")
      .populate("itens.produto", "nome preco");
    res.json(pedidos);
  } catch {
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
};

export const listarPedidosCliente = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ cliente: req.userId })
      .populate("itens.produto", "nome preco");
    res.json(pedidos);
  } catch {
    res.status(500).json({ error: "Erro ao listar pedidos do cliente" });
  }
};

export const atualizarPedido = async (req, res) => {
  try {
    const { itens, status } = req.body;
    const update = {};

    if (itens) {
      let total = 0;
      const itensProcessados = [];
      for (const item of itens) {
        const produtoId = item.produto || item.produtoId;
        const produto = await Produto.findById(produtoId);
        if (!produto) return res.status(404).json({ error: `Produto não encontrado: ${produtoId}` });
        const quantidade = Number(item.quantidade) || 1;
        total += produto.preco * quantidade;
        itensProcessados.push({ produto: produto._id, quantidade });
      }
      update.itens = itensProcessados;
      update.total = total;
    }

    if (status) update.status = status;

    const pedido = await Pedido.findByIdAndUpdate(req.params.id, update, { new: true });
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
