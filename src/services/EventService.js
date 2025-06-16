const EventRepository = require("../repositories/EventRepository");
const UserRepository = require("../repositories/UserRepository");
const EventModel = require("../models/EventModel");

class EventService {
  async createEvent(eventData) {
    const { error } = EventModel.validateEvent(eventData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { titulo, descricao, local, data, user_id } = eventData;

    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const eventDate = new Date(data);
    const now = new Date();

    if (eventDate <= now) {
      throw new Error("A data do evento deve ser no futuro");
    }

    return await EventRepository.create(titulo, descricao, local, data, user_id);
  }

  async getAllEvents() {
    return await EventRepository.findAll();
  }

  async getEventsWithUserDetails() {
    return await EventRepository.findWithUserDetails();
  }

  async getEventById(id) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const event = await EventRepository.findById(id);
    if (!event) {
      throw new Error("Evento não encontrado");
    }

    return event;
  }

  async getEventsByUserId(user_id) {
    if (!user_id || isNaN(user_id)) {
      throw new Error("ID do usuário inválido");
    }

    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return await EventRepository.findByUserId(user_id);
  }

  async updateEvent(id, eventData) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const existingEvent = await EventRepository.findById(id);
    if (!existingEvent) {
      throw new Error("Evento não encontrado");
    }

    const { error } = EventModel.validateEvent(eventData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { titulo, descricao, local, data, user_id } = eventData;

    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const eventDate = new Date(data);
    const now = new Date();

    if (eventDate <= now) {
      throw new Error("A data do evento deve ser no futuro");
    }

    return await EventRepository.update(id, titulo, descricao, local, data, user_id);
  }

  async deleteEvent(id) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const event = await EventRepository.findById(id);
    if (!event) {
      throw new Error("Evento não encontrado");
    }

    return await EventRepository.delete(id);
  }
}

module.exports = new EventService();

