import request from "supertest";
import app from "../src/app.js";
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

describe("Testes de Clientes", () => {

  test("Cria um cliente", async () => {
    const res = await request(app)
      .post("/api/clientes")
      .send({ nome: "Kalil", telefone: "9999-9999" });

    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("Kalil");
  });

  test("Lista clientes", async () => {
    await Cliente.create({ nome: "Ana", telefone: "8888-8888" });

    const res = await request(app).get("/api/clientes");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Atualiza cliente", async () => {
    const cliente = await Cliente.create({ nome: "Velho", telefone: "7777-7777" });

    const res = await request(app)
      .put(`/api/clientes/${cliente._id}`)
      .send({ nome: "Novo" });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Novo");
  });

  test("Deleta cliente", async () => {
    const cliente = await Cliente.create({ nome: "Excluir", telefone: "0000-0000" });

    const res = await request(app).delete(`/api/clientes/${cliente._id}`);

    expect(res.status).toBe(204);
  });

});
