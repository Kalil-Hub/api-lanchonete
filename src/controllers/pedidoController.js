import Pedido from "../models/pedidoModel.js";
import Produto from "../models/produtoModel.js";

export const criarPedido = async (req, res, next) => {
  try {
    const { cliente, itens } = req.body;

    let total = 0;

    for (const item of itens) {
      const produto = await Produto.findById(item.produto);
      if (!produto) continue;
      total += produto.preco * item.quantidade;
    }

    const pedido = await Pedido.create({
      cliente,
      itens,
      total
    });

    res.status(201).json(pedido);

  } catch (error) {
    next(error);
  }
};

export const listarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido
      .find()
      .populate("cliente")
      .populate("itens.produto");

    res.status(200).json(pedidos);
  } catch (error) {
    next(error);
  }
};

export const atualizarPedido = async (req, res, next) => {
  try {
    const { itens, status } = req.body;

    let updateData = {};

    if (itens) {
      let total = 0;

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

    res.status(200).json(pedido);

  } catch (error) {
    next(error);
  }
};

export const deletarPedido = async (req, res, next) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
