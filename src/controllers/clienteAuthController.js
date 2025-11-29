import Cliente from "../models/clienteModel.js";
import jwt from "jsonwebtoken";

export const registrarCliente = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;
    const existe = await Cliente.findOne({ email });
    if (existe) return res.status(400).json({ error: "Email já cadastrado" });
    const cliente = await Cliente.create({ nome, email, senha, telefone });
    res.status(201).json({ id: cliente._id, nome: cliente.nome, email: cliente.email });
  } catch {
    res.status(500).json({ error: "Erro ao registrar cliente" });
  }
};

export const loginCliente = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const cliente = await Cliente.findOne({ email });
    if (!cliente) return res.status(401).json({ error: "Credenciais inválidas" });
    const ok = await cliente.compararSenha(senha);
    if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ id: cliente._id, role: "cliente" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch {
    res.status(500).json({ error: "Erro no login" });
  }
};
