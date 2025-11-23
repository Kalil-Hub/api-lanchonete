import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  itens: [
    {
      produtoId: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
      quantidade: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pendente", "preparando", "pronto", "entregue"],
    default: "pendente"
  }
}, { timestamps: true });

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;
