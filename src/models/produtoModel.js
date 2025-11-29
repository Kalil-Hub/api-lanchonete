import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: { type: String, default: "" },
  preco: { type: Number, required: true, min: 0 },
  imagem: { type: String, default: "" },
  estoque: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Produto", produtoSchema);
