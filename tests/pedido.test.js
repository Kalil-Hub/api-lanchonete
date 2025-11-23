import request from "supertest";
import app from "../src/app.js";
import Produto from "../src/models/produtoModel.js";
import Cliente from "../src/models/clienteModel.js";
import { conectarDBTeste, limparBanco, fecharConexao } from "./config/db.js";

beforeAll(async () => {
  await conectarDBTeste();
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
      .post("/api/pedidos")
      .send({
        cliente: cliente._id,
        itens: [
          { produto: produto._id, quantidade: 2 }
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body.total).toBe(40);
  });

  test("Lista pedidos", async () => {
    const cliente = await Cliente.create({ nome: "Ana", telefone: "8888" });
    const produto = await Produto.create({ nome: "Coca", preco: 10 });

    await request(app)
      .post("/api/pedidos")
      .send({
        cliente: cliente._id,
        itens: [
          { produto: produto._id, quantidade: 1 }
        ]
      });

    const res = await request(app).get("/api/pedidos");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Atualiza pedido", async () => {
    const cliente = await Cliente.create({ nome: "Carlos", telefone: "7777" });
    const produto = await Produto.create({ nome: "Batata", preco: 5 });

    const req1 = await request(app)
      .post("/api/pedidos")
      .send({
        cliente: cliente._id,
        itens: [{ produto: produto._id, quantidade: 2 }]
      });

    const res = await request(app)
      .put(`/api/pedidos/${req1.body._id}`)
      .send({ status: "pronto" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("pronto");
  });

  test("Deleta pedido", async () => {
    const cliente = await Cliente.create({ nome: "ZZZ", telefone: "1111" });
    const produto = await Produto.create({ nome: "Café", preco: 3 });

    const req1 = await request(app)
      .post("/api/pedidos")
      .send({
        cliente: cliente._id,
        itens: [{ produto: produto._id, quantidade: 1 }]
      });

    const res = await request(app).delete(`/api/pedidos/${req1.body._id}`);

    expect(res.status).toBe(204);
  });

});
