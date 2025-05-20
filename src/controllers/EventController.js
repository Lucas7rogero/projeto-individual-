const EventModel = require('../models/EventModel');

exports.criarEvent = async (req, res) => {
  try {
    const { titulo, descricao, local, data, user_id } = req.body;
    const event = await EventModel.criarEvent(titulo, descricao, local, data, user_id);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarEvents = async (req, res) => {
  try {
    const events = await EventModel.listarEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarEvent = async (req, res) => {
  try {
    const { titulo, descricao, local, data, user_id } = req.body;
    const event = await EventModel.editarEvent(req.params.id, titulo, descricao, local, data, user_id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirEvent = async (req, res) => {
  try {
    const event = await EventModel.excluirEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};