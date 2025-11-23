import Cliente from "../models/clienteModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id, role: "cliente" }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registrarCliente = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: "nome, email e senha são obrigatórios" });

    const existe = await Cliente.findOne({ email });
    if (existe) return res.status(409).json({ error: "Email já cadastrado" });

    const cliente = await Cliente.create({ nome, email, senha, telefone });
    const token = signToken(cliente._id);

    res.status(201).json({ cliente: { id: cliente._id, nome: cliente.nome, email: cliente.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar cliente" });
  }
};

export const loginCliente = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: "email e senha são obrigatórios" });

    const cliente = await Cliente.findOne({ email });
    if (!cliente) return res.status(401).json({ error: "Credenciais inválidas" });

    const senhaCorreta = await cliente.compararSenha(senha);
    if (!senhaCorreta) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = signToken(cliente._id);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};
