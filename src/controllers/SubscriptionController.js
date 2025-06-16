const SubscriptionService = require("../services/SubscriptionService");

exports.criarSubscription = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    const subscription = await SubscriptionService.createSubscription({
      user_id,
      event_id,
    });
    res.status(201).json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionService.getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarSubscription = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    const subscription = await SubscriptionService.updateSubscription(
      req.params.id,
      {
        user_id,
        event_id,
      }
    );
    res.status(200).json(subscription);
  } catch (err) {
    if (err.message === "Inscrição não encontrada") {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.excluirSubscription = async (req, res) => {
  try {
    await SubscriptionService.deleteSubscription(req.params.id);
    res.status(200).json({ message: "Inscrição excluída com sucesso" });
  } catch (err) {
    if (err.message === "Inscrição não encontrada") {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

