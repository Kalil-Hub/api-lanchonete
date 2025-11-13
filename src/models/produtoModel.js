import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  imagem: String
});

export default mongoose.model('Produto', produtoSchema);
