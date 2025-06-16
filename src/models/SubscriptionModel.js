const pool = require("../config/db");
const Joi = require("joi");

const subscriptionSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  event_id: Joi.number().integer().required(),
});

exports.validateSubscription = (subscription) => {
  return subscriptionSchema.validate(subscription);
};

exports.criarSubscription = async (user_id, event_id) => {
  const query = `
    INSERT INTO subscriptions (user_id, event_id)
    VALUES ($1, $2) RETURNING *`;
  const values = [user_id, event_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.listarSubscriptions = async () => {
  const query = "SELECT * FROM subscriptions ORDER BY id";
  const result = await pool.query(query);
  return result.rows;
};

exports.editarSubscription = async (id, user_id, event_id) => {
  const query = `
    UPDATE subscriptions
    SET user_id = $1, event_id = $2
    WHERE id = $3
    RETURNING *`;
  const values = [user_id, event_id, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.excluirSubscription = async (id) => {
  const query = "DELETE FROM subscriptions WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

