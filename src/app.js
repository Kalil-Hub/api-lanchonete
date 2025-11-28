import express from "express";
import produtoRoutes from "./routes/produtoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use("/api/auth/cliente", clienteAuthRoutes);
app.use("/api/auth/admin", adminAuthRoutes);

<<<<<<< Updated upstream
<<<<<<< HEAD
app.use("/api/v1/auth/cliente", clienteAuthRoutes);
app.use("/api/v1/auth/admin", adminAuthRoutes);

app.use("/api/v1/produtos", produtoRoutes);
app.use("/api/v1/clientes", clienteRoutes);
app.use("/api/v1/pedidos", pedidoRoutes);
=======
app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/pedidos", pedidoRoutes);
>>>>>>> parent of a549546 (Realiznaod totalmente a autenticação e melhorando a segurança)

app.use(errorHandler);
import { errorHandler } from "./middlewares/errorHandler.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/pedidos", pedidoRoutes);

app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);
=======
app.use("/produtos", produtoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/pedidos", pedidoRoutes);
>>>>>>> Stashed changes

app.use(errorHandler);

export default app;
