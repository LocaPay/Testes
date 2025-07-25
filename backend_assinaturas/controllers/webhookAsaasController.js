const service = require("../services/webhookAsaasService");

exports.receberEvento = (req, res) => {
  const { event } = req.body;

  if (!event) {
    return res.status(400).json({ ok: false, error: "Evento não especificado" });
  }

  service.processarEvento(req.body);
  res.status(200).json({ ok: true });
};
