import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Rota de clientes funcionando" });
});

export default router;
