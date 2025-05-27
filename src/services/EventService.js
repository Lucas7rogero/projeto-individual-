const EventRepository = require('../repositories/EventRepository');
const UserRepository = require('../repositories/UserRepository');

class EventService {
  async createEvent(titulo, descricao, local, data, user_id) {
    // Validação de entrada
    if (!titulo || !descricao || !local || !data || !user_id) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (isNaN(user_id)) {
      throw new Error('ID do usuário inválido');
    }

    // Verificar se o usuário existe
    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Validar data
    const eventDate = new Date(data);
    const now = new Date();
    
    if (eventDate <= now) {
      throw new Error('A data do evento deve ser no futuro');
    }

    // Criar evento
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
      throw new Error('ID inválido');
    }

    const event = await EventRepository.findById(id);
    if (!event) {
      throw new Error('Evento não encontrado');
    }

    return event;
  }

  async getEventsByUserId(user_id) {
    if (!user_id || isNaN(user_id)) {
      throw new Error('ID do usuário inválido');
    }

    // Verificar se o usuário existe
    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return await EventRepository.findByUserId(user_id);
  }

  async updateEvent(id, titulo, descricao, local, data, user_id) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    // Verificar se o evento existe
    const existingEvent = await EventRepository.findById(id);
    if (!existingEvent) {
      throw new Error('Evento não encontrado');
    }

    // Validação de entrada
    if (!titulo || !descricao || !local || !data || !user_id) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (isNaN(user_id)) {
      throw new Error('ID do usuário inválido');
    }

    // Verificar se o usuário existe
    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Validar data
    const eventDate = new Date(data);
    const now = new Date();
    
    if (eventDate <= now) {
      throw new Error('A data do evento deve ser no futuro');
    }

    return await EventRepository.update(id, titulo, descricao, local, data, user_id);
  }

  async deleteEvent(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    const event = await EventRepository.findById(id);
    if (!event) {
      throw new Error('Evento não encontrado');
    }

    return await EventRepository.delete(id);
  }
}

module.exports = new EventService();