import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import clienteAuthRoutes from "./routes/clienteAuthRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin/auth", adminAuthRoutes);
app.use("/cliente/auth", clienteAuthRoutes);
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/pedidos", pedidoRoutes);

app.use(errorHandler);

export default app;
