import express from "express";
import produtoRoutes from "./routes/produtoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/pedidos", pedidoRoutes);

app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);

app.use(errorHandler);

export default app;
