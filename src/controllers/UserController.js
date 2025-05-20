const UserModel = require('../models/UserModel');

exports.criarUser = async (req, res) => {
  try {
    const user = await UserModel.criarUser(req.body.nome, req.body.email, req.body.senha);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarUsers = async (req, res) => {
  try {
    const users = await UserModel.listarUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarUser = async (req, res) => {
  try {
    const user = await UserModel.editarUser(req.params.id, req.body.nome, req.body.email, req.body.senha);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirUser = async (req, res) => {
  try {
    const user = await UserModel.excluirUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};