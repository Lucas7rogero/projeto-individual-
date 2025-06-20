const pool = require("../config/db");
const Joi = require("joi");

const userSchema = Joi.object({
  nome: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

exports.validateUser = (user) => {
  return userSchema.validate(user);
};

exports.criarUser = async (nome, email, senha) => {
  const query = `
    INSERT INTO users (nome, email, senha)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [nome, email, senha];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.listarUsers = async () => {
  const query = "SELECT * FROM users ORDER BY id";
  const result = await pool.query(query);
  return result.rows;
};

exports.editarUser = async (id, nome, email, senha) => {
  const query = `
    UPDATE users
    SET nome = $1, email = $2, senha = $3
    WHERE id = $4 RETURNING *`;
  const values = [nome, email, senha, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.excluirUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

