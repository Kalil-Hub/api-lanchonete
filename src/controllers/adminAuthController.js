import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

export const registrarAdmin = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existe = await Admin.findOne({ email });
    if (existe) return res.status(400).json({ error: "Email já cadastrado" });

    const admin = await Admin.create({ nome, email, senha });
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar admin" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Credenciais inválidas" });

    const senhaOK = await admin.compararSenha(senha);
    if (!senhaOK) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch {
    res.status(500).json({ error: "Erro no login" });
  }
};
