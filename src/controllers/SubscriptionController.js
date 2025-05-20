const SubscriptionModel = require('../models/SubscriptionModel');

exports.criarSubscription = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    const subscription = await SubscriptionModel.criarSubscription(user_id, event_id);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionModel.listarSubscriptions();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarSubscription = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    const subscription = await SubscriptionModel.editarSubscription(req.params.id, user_id, event_id);

    if (!subscription) {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }

    res.status(200).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirSubscription = async (req, res) => {
  try {
    const subscription = await SubscriptionModel.excluirSubscription(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
    res.status(200).json({ message: 'Inscrição excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};