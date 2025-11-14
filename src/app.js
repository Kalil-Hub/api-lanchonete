import express from "express";
import produtoRoutes from "./routes/produtoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);

export default app;
