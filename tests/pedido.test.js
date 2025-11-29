import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/app.js";
import Produto from "../src/models/produtoModel.js";
import Cliente from "../src/models/clienteModel.js";
import { conectarDBTeste, limparBanco, fecharConexao } from "./config/db.js";

let token;

beforeAll(async () => {
  await conectarDBTeste();
  token = jwt.sign(
    { id: "admin123", role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
});

beforeEach(async () => {
  await limparBanco();
});

afterAll(async () => {
  await fecharConexao();
});

describe("Testes de Pedidos", () => {

  test("Cria um pedido com cálculo automático", async () => {
    const cliente = await Cliente.create({ nome: "Kalil", telefone: "9999" });
    const produto = await Produto.create({ nome: "X-Burger", preco: 20 });

    const res = await request(app)
      .post("/api/v1/pedidos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cliente: cliente._id,
        itens: [{ produto: produto._id, quantidade: 2 }]
      });

    expect(res.status).toBe(201);
    expect(res.body.total).toBe(40);
  });

  test("Lista pedidos", async () => {
    const cliente = await Cliente.create({ nome: "Ana", telefone: "8888" });
    const produto = await Produto.create({ nome: "Coca", preco: 10 });

    await request(app)
      .post("/api/v1/pedidos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cliente: cliente._id,
        itens: [{ produto: produto._id, quantidade: 1 }]
      });

    const res = await request(app)
      .get("/api/v1/pedidos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Atualiza pedido", async () => {
    const cliente = await Cliente.create({ nome: "Carlos", telefone: "7777" });
    const produto = await Produto.create({ nome: "Batata", preco: 5 });

    const pedido = await request(app)
      .post("/api/v1/pedidos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cliente: cliente._id,
        itens: [{ produto: produto._id, quantidade: 2 }]
      });

    const res = await request(app)
      .put(`/api/v1/pedidos/${pedido.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "pronto" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("pronto");
  });

  test("Deleta pedido", async () => {
    const cliente = await Cliente.create({ nome: "ZZZ", telefone: "1111" });
    const produto = await Produto.create({ nome: "Café", preco: 3 });

    const pedido = await request(app)
      .post("/api/v1/pedidos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cliente: cliente._id,
        itens: [{ produto: produto._id, quantidade: 1 }]
      });

    const res = await request(app)
      .delete(`/api/v1/pedidos/${pedido.body._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
