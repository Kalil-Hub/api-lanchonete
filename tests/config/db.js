import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const conectarDBTeste = async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

export const limparBanco = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export const fecharConexao = async () => {
  await mongoose.connection.close();
};
