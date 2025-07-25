module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authHeaderAsaas = req.headers["asaas-access-token"];
  const apiKey = process.env.ASSINATURAS_API_KEY;

  if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
    return res.status(403).json({ erro: "Acesso não autorizado" });
  } else if (!authHeaderAsaas || authHeaderAsaas !== `Bearer ${apiKey}`) {
    return res.status(403).json({ erro: "Acesso não autorizado" });
  }

  next();
};
