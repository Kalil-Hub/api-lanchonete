import express from "express";

import clienteAuthRoutes from "./routes/clienteAuthRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

import produtoRoutes from "./routes/produtoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/auth/cliente", clienteAuthRoutes);
app.use("/api/auth/admin", adminAuthRoutes);

app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/pedidos", pedidoRoutes);

export default app;
