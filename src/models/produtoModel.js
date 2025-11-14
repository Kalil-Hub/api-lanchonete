import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  imagem: { type: String },
  estoque: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Produto", produtoSchema);
