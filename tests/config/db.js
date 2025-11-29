import mongoose from "mongoose";

export const conectarDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI não encontrada.");

  await mongoose.connect(uri);
};

export const conectarDBTeste = async () => {
  if (mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGO_URI_TEST;
  if (!uri) throw new Error("MONGO_URI_TEST não encontrada.");

  await mongoose.connect(uri);
};

export const limparBanco = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export const fecharConexao = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};
