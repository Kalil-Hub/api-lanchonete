import dotenv from "dotenv";
import mongoose from "mongoose";
import request from "supertest";
import app from "../src/server.js";

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Testes de Produtos", () => {
  it("Cria um produto", async () => {
    const res = await request(app)
      .post("/api/produtos")
      .send({ nome: "Coxinha", preco: 5.0 });
    expect(res.statusCode).toBe(201);
  });

  it("Lista produtos", async () => {
    const res = await request(app).get("/api/produtos");
    expect(res.statusCode).toBe(200);
  });

  it("Atualiza produto", async () => {
    const produto = await request(app)
      .post("/api/produtos")
      .send({ nome: "Pastel", preco: 6.0 });
    const res = await request(app)
      .put(`/api/produtos/${produto.body._id}`)
      .send({ nome: "Pastel de carne", preco: 7.0 });
    expect(res.statusCode).toBe(200);
  });

  it("Exclui produto", async () => {
    const produto = await request(app)
      .post("/api/produtos")
      .send({ nome: "Esfirra", preco: 4.0 });
    const res = await request(app).delete(`/api/produtos/${produto.body._id}`);
    expect(res.statusCode).toBe(204);
  });
});
