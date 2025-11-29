import express from "express";
import produtoRoutes from "./routes/produtoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import clienteAuthRoutes from "./routes/clienteAuthRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import auth from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth/cliente", clienteAuthRoutes);
app.use("/api/v1/auth/admin", adminAuthRoutes);

// desabilitando autenticação durante testes
const isTest = process.env.NODE_ENV === "test";

if (!isTest) {
  app.use("/api/v1/produtos", auth);
  app.use("/api/v1/clientes", auth);
  app.use("/api/v1/pedidos", auth);
}

app.use("/api/v1/produtos", produtoRoutes);
app.use("/api/v1/clientes", clienteRoutes);
app.use("/api/v1/pedidos", pedidoRoutes);

app.use(errorHandler);

export default app;
