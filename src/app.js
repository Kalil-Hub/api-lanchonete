import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import produtoRoutes from './routes/produtoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/produtos', produtoRoutes);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`
);

export default app;
