import Pedido from "../models/pedidoModel.js";

export const criarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.create({
      ...req.body,
      clienteId: req.userId
    });
    res.status(201).json(pedido);
  } catch {
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate("itens.produtoId");
    res.json(pedidos);
  } catch {
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
};

export const atualizarStatus = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(pedido);
  } catch {
    res.status(500).json({ error: "Erro ao atualizar status" });
  }
};
