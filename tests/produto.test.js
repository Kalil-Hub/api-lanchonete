import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import jwt from "jsonwebtoken";
import Produto from "../src/models/produtoModel.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // Cria um token válido para os testes
  token = jwt.sign(
    { id: "123", nome: "Teste" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
});

afterAll(async () => {
  await Produto.deleteMany();
  await mongoose.connection.close();
});

describe("Testes de Produtos", () => {
  it("Cria um produto", async () => {
    const res = await request(app)
      .post("/api/produtos")
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Pastel", preco: 6.0 });

    const res = await request(app)
      .put(`/api/produtos/${produto.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Pastel de carne", preco: 7.0 });

    expect(res.statusCode).toBe(200);
  });

  it("Exclui produto", async () => {
    const produto = await request(app)
      .post("/api/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Esfirra", preco: 4.0 });

    const res = await request(app)
      .delete(`/api/produtos/${produto.body._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
