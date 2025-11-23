import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registrarAdmin = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) return res.status(400).json({ error: "nome, email e senha são obrigatórios" });

    const existe = await Admin.findOne({ email });
    if (existe) return res.status(409).json({ error: "Email já cadastrado" });

    const admin = await Admin.create({ nome, email, senha });
    const token = signToken(admin._id);

    res.status(201).json({ admin: { id: admin._id, nome: admin.nome, email: admin.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar admin" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: "email e senha são obrigatórios" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Credenciais inválidas" });

    const senhaOK = await admin.compararSenha(senha);
    if (!senhaOK) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = signToken(admin._id);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no login" });
  }
};
