import Cliente from "../models/clienteModel.js";

export const criarCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
};

export const listarClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
};

export const atualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
};

export const deletarCliente = async (req, res, next) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
