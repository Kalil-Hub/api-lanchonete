import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
  quantidade: { type: Number, required: true, min: 1 }
});

const pedidoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  itens: [itemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: "pendente" }
}, { timestamps: true });

export default mongoose.model("Pedido", pedidoSchema);
