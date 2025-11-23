import express from "express";

import clienteAuthRoutes from "./routes/clienteAuthRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

import produtoRoutes from "./routes/produtoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

const app = express();

app.use(express.json());

// AUTH
app.use("/api/v1/auth/cliente", clienteAuthRoutes);
app.use("/api/v1/auth/admin", adminAuthRoutes);

// ENTIDADES
app.use("/api/v1/produtos", produtoRoutes);
app.use("/api/v1/clientes", clienteRoutes);
app.use("/api/v1/pedidos", pedidoRoutes);

export default app;
