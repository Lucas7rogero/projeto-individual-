const UserService = require("../services/UserService");

exports.criarUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const user = await UserService.createUser({
      nome,
      email,
      senha,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const user = await UserService.updateUser(req.params.id, {
      nome,
      email,
      senha,
    });
    res.status(200).json(user);
  } catch (err) {
    if (err.message === "Usuário não encontrado") {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.excluirUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (err) {
    if (err.message === "Usuário não encontrado") {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

