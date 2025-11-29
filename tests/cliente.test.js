import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/app.js";
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

describe("Testes de Clientes", () => {

  test("Cria um cliente", async () => {
    const res = await request(app)
      .post("/api/v1/clientes")
      .send({ nome: "Kalil", telefone: "9999-9999" });

    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("Kalil");
  });

  test("Lista clientes", async () => {
    await Cliente.create({ nome: "Ana", telefone: "8888-8888" });

    const res = await request(app)
      .get("/api/v1/clientes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Atualiza um cliente", async () => {
    const cliente = await Cliente.create({ nome: "Velho", telefone: "7777" });

    const res = await request(app)
      .put(`/api/v1/clientes/${cliente._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Novo" });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Novo");
  });

  test("Deleta um cliente", async () => {
    const cliente = await Cliente.create({ nome: "Excluir", telefone: "0000" });

    const res = await request(app)
      .delete(`/api/v1/clientes/${cliente._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
