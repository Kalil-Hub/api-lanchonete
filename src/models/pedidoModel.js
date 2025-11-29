import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
  quantidade: { type: Number, required: true, min: 1 }
});

const pedidoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  itens: { type: [itemSchema], required: true },
  total: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["pendente", "preparando", "pronto", "entregue"],
    default: "pendente"
  }
}, { timestamps: true });

export default mongoose.model("Pedido", pedidoSchema);
