const UserRepository = require('../repositories/UserRepository');

class UserService {
  async createUser(nome, email, senha) {
    // Validação de entrada
    if (!nome || !email || !senha) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Email inválido');
    }

    if (senha.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    // Verificar se o email já existe
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Criar usuário
    return await UserRepository.create(nome, email, senha);
  }

  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  async updateUser(id, nome, email, senha) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    // Verificar se o usuário existe
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Validações
    if (!nome || !email || !senha) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Email inválido');
    }

    if (senha.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    // Verificar se o email já está em uso por outro usuário
    const userWithEmail = await UserRepository.findByEmail(email);
    if (userWithEmail && userWithEmail.id !== parseInt(id)) {
      throw new Error('Email já está em uso por outro usuário');
    }

    return await UserRepository.update(id, nome, email, senha);
  }

  async deleteUser(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return await UserRepository.delete(id);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = new UserService();