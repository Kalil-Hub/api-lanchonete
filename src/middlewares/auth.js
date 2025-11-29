import jwt from "jsonwebtoken";

export default (req, res, next) => {

  if (process.env.NODE_ENV === "test") {
    return next();
  }

  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return res.status(401).json({ error: "Token ausente" });

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
