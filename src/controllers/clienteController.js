import Cliente from "../models/clienteModel.js";

export const criarCliente = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;
    const existe = await Cliente.findOne({ email });
    if (existe) return res.status(409).json({ error: "Email já cadastrado" });
    const cliente = await Cliente.create({ nome, email, senha, telefone });
    res.status(201).json({ id: cliente._id, nome: cliente.nome, email: cliente.email });
  } catch {
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
};

export const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().select("-senha");
    res.json(clientes);
  } catch {
    res.status(500).json({ error: "Erro ao listar clientes" });
  }
};
