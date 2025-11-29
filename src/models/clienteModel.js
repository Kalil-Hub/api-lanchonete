import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String },
  senha: { type: String }
});

export default mongoose.model("Cliente", clienteSchema);
