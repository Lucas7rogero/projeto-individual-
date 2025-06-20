const pool = require("../config/db");
const Joi = require("joi");

const eventSchema = Joi.object({
  titulo: Joi.string().min(3).max(255).required(),
  descricao: Joi.string().min(3).required(),
  local: Joi.string().min(3).max(255).required(),
  data: Joi.date().iso().required(),
  user_id: Joi.number().integer().required(),
});

exports.validateEvent = (event) => {
  return eventSchema.validate(event);
};

exports.criarEvent = async (titulo, descricao, local, data, user_id) => {
  const query = `
    INSERT INTO events (titulo, descricao, local, data, user_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [titulo, descricao, local, data, user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.listarEvents = async () => {
  const query = "SELECT * FROM events ORDER BY id";
  const result = await pool.query(query);
  return result.rows;
};

exports.editarEvent = async (id, titulo, descricao, local, data, user_id) => {
  const query = `
    UPDATE events
    SET titulo = $1, descricao = $2, local = $3, data = $4, user_id = $5
    WHERE id = $6 RETURNING *`;
  const values = [titulo, descricao, local, data, user_id, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.excluirEvent = async (id) => {
  const query = "DELETE FROM events WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

