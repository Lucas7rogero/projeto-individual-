const SubscriptionRepository = require('../repositories/SubscriptionRepository');
const UserRepository = require('../repositories/UserRepository');
const EventRepository = require('../repositories/EventRepository');

class SubscriptionService {
  async createSubscription(user_id, event_id) {
    // Validação de entrada
    if (!user_id || !event_id) {
      throw new Error('ID do usuário e ID do evento são obrigatórios');
    }

    if (isNaN(user_id) || isNaN(event_id)) {
      throw new Error('IDs devem ser números válidos');
    }

    // Verificar se o usuário existe
    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se o evento existe
    const event = await EventRepository.findById(event_id);
    if (!event) {
      throw new Error('Evento não encontrado');
    }

    // Verificar se o evento não passou
    const eventDate = new Date(event.data);
    const now = new Date();
    
    if (eventDate <= now) {
      throw new Error('Não é possível se inscrever em eventos que já passaram');
    }

    // Verificar se o usuário já está inscrito no evento
    const existingSubscription = await SubscriptionRepository.findByUserAndEvent(user_id, event_id);
    if (existingSubscription) {
      throw new Error('Usuário já está inscrito neste evento');
    }

    // Verificar se o usuário não é o criador do evento
    if (event.user_id === parseInt(user_id)) {
      throw new Error('O criador do evento não pode se inscrever no próprio evento');
    }

    // Criar inscrição
    return await SubscriptionRepository.create(user_id, event_id);
  }

  async getAllSubscriptions() {
    return await SubscriptionRepository.findAll();
  }

  async getSubscriptionsWithDetails() {
    return await SubscriptionRepository.findWithDetails();
  }

  async getSubscriptionById(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    const subscription = await SubscriptionRepository.findById(id);
    if (!subscription) {
      throw new Error('Inscrição não encontrada');
    }

    return subscription;
  }

  async getSubscriptionsByUserId(user_id) {
    if (!user_id || isNaN(user_id)) {
      throw new Error('ID do usuário inválido');
    }

    // Verificar se o usuário existe
    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return await SubscriptionRepository.findByUserId(user_id);
  }

  async getSubscriptionsByEventId(event_id) {
    if (!event_id || isNaN(event_id)) {
      throw new Error('ID do evento inválido');
    }

    // Verificar se o evento existe
    const event = await EventRepository.findById(event_id);
    if (!event) {
      throw new Error('Evento não encontrado');
    }

    return await SubscriptionRepository.findByEventId(event_id);
  }

  async getEventSubscriptionCount(event_id) {
    if (!event_id || isNaN(event_id)) {
      throw new Error('ID do evento inválido');
    }

    return await SubscriptionRepository.countByEventId(event_id);
  }

  async updateSubscription(id, user_id, event_id) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    // Verificar se a inscrição existe
    const existingSubscription = await SubscriptionRepository.findById(id);
    if (!existingSubscription) {
      throw new Error('Inscrição não encontrada');
    }

    // Validação de entrada
    if (!user_id || !event_id) {
      throw new Error('ID do usuário e ID do evento são obrigatórios');
    }

    if (isNaN(user_id) || isNaN(event_id)) {
      throw new Error('IDs devem ser números válidos');
    }

    // Verificar se o usuário existe
    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se o evento existe
    const event = await EventRepository.findById(event_id);
    if (!event) {
      throw new Error('Evento não encontrado');
    }

    // Verificar se o evento não passou
    const eventDate = new Date(event.data);
    const now = new Date();
    
    if (eventDate <= now) {
      throw new Error('Não é possível alterar inscrição em eventos que já passaram');
    }

    // Verificar se já existe outra inscrição para o mesmo usuário e evento (exceto a atual)
    const duplicateSubscription = await SubscriptionRepository.findByUserAndEvent(user_id, event_id);
    if (duplicateSubscription && duplicateSubscription.id !== parseInt(id)) {
      throw new Error('Usuário já está inscrito neste evento');
    }

    return await SubscriptionRepository.update(id, user_id, event_id);
  }

  async deleteSubscription(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    const subscription = await SubscriptionRepository.findById(id);
    if (!subscription) {
      throw new Error('Inscrição não encontrada');
    }

    // Verificar se o evento não passou (opcional - pode permitir cancelamento mesmo após o evento)
    const event = await EventRepository.findById(subscription.event_id);
    if (event) {
      const eventDate = new Date(event.data);
      const now = new Date();
      
      if (eventDate <= now) {
        throw new Error('Não é possível cancelar inscrição em eventos que já passaram');
      }
    }

    return await SubscriptionRepository.delete(id);
  }
}

module.exports = new SubscriptionService();