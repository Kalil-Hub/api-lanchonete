import express from "express";

import clienteAuthRoutes from "./routes/clienteAuthRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

import produtoRoutes from "./routes/produtoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/api/v1/auth/cliente", clienteAuthRoutes);
app.use("/api/v1/auth/admin", adminAuthRoutes);

app.use("/api/v1/produtos", produtoRoutes);
app.use("/api/v1/clientes", clienteRoutes);
app.use("/api/v1/pedidos", pedidoRoutes);

app.use(errorHandler);
import { errorHandler } from "./middlewares/errorHandler.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/pedidos", pedidoRoutes);

app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);

app.use(errorHandler);

export default app;
