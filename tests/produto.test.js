import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/app.js";
import Produto from "../src/models/produtoModel.js";
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

describe("Testes de Produtos (com DB real)", () => {
  test("Cria um produto", async () => {
    const res = await request(app)
      .post("/api/v1/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Teste", preco: 10 });

    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("Teste");
  });

  test("Lista produtos", async () => {
    await Produto.create({ nome: "A", preco: 20 });

    const res = await request(app).get("/api/v1/produtos");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Atualiza produto", async () => {
    const produto = await Produto.create({ nome: "Velho", preco: 30 });

    const res = await request(app)
      .put(`/api/v1/produtos/${produto._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Novo", preco: 35 });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Novo");
  });

  test("Deleta produto", async () => {
    const produto = await Produto.create({ nome: "Lixo", preco: 1 });

    const res = await request(app)
      .delete(`/api/v1/produtos/${produto._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
