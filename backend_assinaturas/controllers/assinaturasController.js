const { json } = require("express");
const assinaturaService = require("../services/assinaturasService");

async function buscarAssinatura(req, res) {
  const { locador_id } = req.params;

  try {
    const assinatura = await assinaturaService.BuscarAssinatura(locador_id);

    if (!assinatura) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Assinatura não encontrada para este locador",
      });
    }

    return res.status(200).json({ sucesso: true, assinatura });
  } catch (error) {
    console.error("Erro no controller buscarAssinatura:", error.message);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao buscar assinatura",
    });
  }
}

async function adicionarAssinatura(req, res) {
  const { locador_id, plano_id } = req.body;

  try {
    const resultado = await assinaturaService.adicionarAssinatura(
      locador_id,
      plano_id
    );

    return res.status(201).json(resultado);
  } catch (error) {
    console.error("Erro no controller adicionarAssinatura:", error.message);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao adicionar assinatura",
    });
  }
}

async function atualizarDatasInicioFim() {
  const { locador_id } = req.params;
  const { data_inicio, data_fim } = req.body;

  try {
    const resultado = await assinaturaService.atualizarStatusAssinatura(
      locador_id,
      data_inicio,
      data_fim
    );

    return res.status(200).json(resultado);
  } catch (error) {
    console.error(
      "Erro no controller atualizarStatusAssinatura:",
      error.message
    );
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar status da assinatura",
    });
  }
}

async function atualizarAssinatura(req, res) {
  const { locador_id } = req.params;
  const { novoPlano_id } = req.body;

  try {
    const resultado = await assinaturaService.atualizarAssinatura(
      locador_id,
      novoPlano_id
    );

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro no controller atualizarAssinatura:", error.message);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar assinatura",
    });
  }
}

async function atualizarStatusAssinatura(req, res) {
  const { customer_id, status } = req.body;
  let locador;

  console.log("📥 Requisição recebida para atualizar status da assinatura:", {
    customer_id,
    status,
  });

  try {
    const response = await fetch(
      `${process.env.API_BASE}/user/buscar-id-por-cus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cus_id: customer_id }),
      }
    );

    const data = await response.json();
    console.log("🔍 Resposta da API buscar-id-por-cus:", data);

    if (!data?.id) {
      console.error("❌ ID do locador não encontrado:", data);
      return res
        .status(400)
        .json({
          sucesso: false,
          mensagem: "Locador não encontrado com o customer_id fornecido.",
        });
    }

    locador = data.id;
  } catch (err) {
    console.error("❌ Erro ao buscar id por cus_id:", err);
    return res
      .status(500)
      .json({
        sucesso: false,
        mensagem: "Erro ao buscar locador com customer_id",
      });
  }

  console.log("📦 Enviando para service:", { locador_id: locador, status });

  try {
    const resultado = await assinaturaService.atualizarStatusAssinatura(
      locador,
      status
    );
    return res.status(200).json(resultado);
  } catch (error) {
    console.error(
      "❌ Erro no controller atualizarStatusAssinatura:",
      error.message
    );
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar status da assinatura",
    });
  }
}

module.exports = {
  buscarAssinatura,
  adicionarAssinatura,
  atualizarDatasInicioFim,
  atualizarAssinatura,
  atualizarStatusAssinatura,
};
