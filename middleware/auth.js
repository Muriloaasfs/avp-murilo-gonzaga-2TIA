export function autenticar(req, res, next) {
  const authorization = req.headers.authorization;
  const partes = authorization?.split(" ") ?? [];
  const [tipo, token] = partes;

  if (partes.length !== 2 || tipo !== "Bearer" || !token || token !== process.env.API_TOKEN) {
    return res.status(401).json({ message: "Token ausente ou inválido" });
  }

  next();
}
