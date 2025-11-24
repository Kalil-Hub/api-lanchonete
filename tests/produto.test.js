import request from "supertest";
import app from "../src/app.js";
import Produto from "../src/models/produtoModel.js";
import {
  conectarDBTeste,
  limparBanco,
  fecharConexao
} from "./config/db.js";

beforeAll(async () => {
  await conectarDBTeste();
});

beforeEach(async () => {
  await limparBanco();
});

afterAll(async () => {
  await fecharConexao();
});

describe("Testes de Produtos (com DB real)", () => {
  test("Cria um produto", async () => {
    const res = await request(app)
      .post("/api/produtos")
      .send({ nome: "Teste", preco: 10 });

    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("Teste");
  });

  test("Lista produtos", async () => {
    await Produto.create({ nome: "A", preco: 20 });

    const res = await request(app).get("/api/produtos");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Atualiza produto", async () => {
    const produto = await Produto.create({ nome: "Velho", preco: 30 });

    const res = await request(app)
      .put(`/api/produtos/${produto._id}`)
      .send({ nome: "Novo", preco: 35 });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Novo");
  });

  test("Deleta produto", async () => {
    const produto = await Produto.create({ nome: "Lixo", preco: 1 });

    const res = await request(app).delete(`/api/produtos/${produto._id}`);

    expect(res.status).toBe(204);
  });
});
afterAll(async () => {
  await fecharConexao();
  await new Promise(resolve => setTimeout(resolve, 300));
});
