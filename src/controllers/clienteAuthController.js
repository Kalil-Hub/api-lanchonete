import Cliente from "../models/clienteModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginCliente = async (req, res) => {
  const { email, senha } = req.body;

  const cliente = await Cliente.findOne({ email });
  if (!cliente) return res.status(401).json({ error: "Credenciais inválidas" });

  const senhaOk = await bcrypt.compare(senha, cliente.senha);
  if (!senhaOk) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign(
    { id: cliente._id, role: "cliente" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};
