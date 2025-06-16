const UserRepository = require("../repositories/UserRepository");
const UserModel = require("../models/UserModel");

class UserService {
  async createUser(userData) {
    const { error } = UserModel.validateUser(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { nome, email, senha } = userData;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    return await UserRepository.create(nome, email, senha);
  }

  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async updateUser(id, userData) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    const { error } = UserModel.validateUser(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { nome, email, senha } = userData;

    const userWithEmail = await UserRepository.findByEmail(email);
    if (userWithEmail && userWithEmail.id !== parseInt(id)) {
      throw new Error("Email já está em uso por outro usuário");
    }

    return await UserRepository.update(id, nome, email, senha);
  }

  async deleteUser(id) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return await UserRepository.delete(id);
  }
}

module.exports = new UserService();

