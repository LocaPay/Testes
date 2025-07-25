exports.processarEvento = async (data) => {
  const { event, subscription, payment } = data;

  console.log("Evento recebido:", event);

  switch (event) {
    case "SUBSCRIPTION_CREATED":
      console.log("Assinatura criada:", subscription);

      try {
        const response = await fetch(`${process.env.API_BASE_ASSINATURAS}/asaas_events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: subscription.customer,
            status: "ativa",
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Status da assinatura atualizado com sucesso:", result);
        } else {
          console.error("Erro na resposta ao atualizar:", result);
        }
      } catch (error) {
        console.error("Erro ao fazer requisição para atualizar assinatura:", error.message);
      }

      break;

    case "SUBSCRIPTION_DELETED":
      console.log("Assinatura cancelada:", subscription);
      break;

    case "PAYMENT_CREATED":
      console.log("Pagamento criado:", payment);
      break;

    case "PAYMENT_RECEIVED":
      console.log("Pagamento recebido:", payment);
      break;

    case "PAYMENT_OVERDUE":
      console.log("Pagamento vencido:", payment);
      break;

    default:
      console.log("Evento não tratado:", event);
  }
};
