const SubscriptionRepository = require("../repositories/SubscriptionRepository");
const UserRepository = require("../repositories/UserRepository");
const EventRepository = require("../repositories/EventRepository");

class SubscriptionService {
  async createSubscription(user_id, event_id) {
    if (!user_id || !event_id) {
      throw new Error("ID do usuário e ID do evento são obrigatórios");
    }

    if (isNaN(user_id) || isNaN(event_id)) {
      throw new Error("IDs devem ser números válidos");
    }

    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const event = await EventRepository.findById(event_id);
    if (!event) {
      throw new Error("Evento não encontrado");
    }

    const eventDate = new Date(event.data);
    const now = new Date();
    if (eventDate <= now) {
      throw new Error("Não é possível se inscrever em eventos que já passaram");
    }

    const existingSubscription =
      await SubscriptionRepository.findByUserAndEvent(user_id, event_id);
    if (existingSubscription) {
      throw new Error("Usuário já está inscrito neste evento");
    }

    if (event.user_id === parseInt(user_id)) {
      throw new Error(
        "O criador do evento não pode se inscrever no próprio evento"
      );
    }

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
      throw new Error("ID inválido");
    }

    const subscription = await SubscriptionRepository.findById(id);
    if (!subscription) {
      throw new Error("Inscrição não encontrada");
    }

    return subscription;
  }

  async getSubscriptionsByUserId(user_id) {
    if (!user_id || isNaN(user_id)) {
      throw new Error("ID do usuário inválido");
    }

    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return await SubscriptionRepository.findByUserId(user_id);
  }

  async getSubscriptionsByEventId(event_id) {
    if (!event_id || isNaN(event_id)) {
      throw new Error("ID do evento inválido");
    }

    const event = await EventRepository.findById(event_id);
    if (!event) {
      throw new Error("Evento não encontrado");
    }

    return await SubscriptionRepository.findByEventId(event_id);
  }

  async getEventSubscriptionCount(event_id) {
    if (!event_id || isNaN(event_id)) {
      throw new Error("ID do evento inválido");
    }

    return await SubscriptionRepository.countByEventId(event_id);
  }

  async updateSubscription(id, user_id, event_id) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const existingSubscription = await SubscriptionRepository.findById(id);
    if (!existingSubscription) {
      throw new Error("Inscrição não encontrada");
    }

    if (!user_id || !event_id) {
      throw new Error("ID do usuário e ID do evento são obrigatórios");
    }

    if (isNaN(user_id) || isNaN(event_id)) {
      throw new Error("IDs devem ser números válidos");
    }

    const user = await UserRepository.findById(user_id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const event = await EventRepository.findById(event_id);
    if (!event) {
      throw new Error("Evento não encontrado");
    }

    const eventDate = new Date(event.data);
    const now = new Date();
    if (eventDate <= now) {
      throw new Error(
        "Não é possível alterar inscrição em eventos que já passaram"
      );
    }

    const duplicateSubscription =
      await SubscriptionRepository.findByUserAndEvent(user_id, event_id);
    if (duplicateSubscription && duplicateSubscription.id !== parseInt(id)) {
      throw new Error("Usuário já está inscrito neste evento");
    }

    return await SubscriptionRepository.update(id, user_id, event_id);
  }

  async deleteSubscription(id) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const subscription = await SubscriptionRepository.findById(id);
    if (!subscription) {
      throw new Error("Inscrição não encontrada");
    }

    return await SubscriptionRepository.delete(id);
  }
}

module.exports = new SubscriptionService();
