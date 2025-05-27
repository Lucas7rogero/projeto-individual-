const EventService = require("../services/EventService");

exports.criarEvent = async (req, res) => {
  try {
    const { titulo, descricao, local, data, user_id } = req.body;
    const event = await EventService.createEvent(
      titulo,
      descricao,
      local,
      data,
      user_id
    );
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarEvents = async (req, res) => {
  try {
    const events = await EventService.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarEvent = async (req, res) => {
  try {
    const { titulo, descricao, local, data, user_id } = req.body;
    const event = await EventService.updateEvent(
      req.params.id,
      titulo,
      descricao,
      local,
      data,
      user_id
    );
    res.status(200).json(event);
  } catch (err) {
    if (err.message === "Evento não encontrado") {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.excluirEvent = async (req, res) => {
  try {
    await EventService.deleteEvent(req.params.id);
    res.status(200).json({ message: "Evento excluído com sucesso" });
  } catch (err) {
    if (err.message === "Evento não encontrado") {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};
