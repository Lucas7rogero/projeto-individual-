const pool = require('../config/db');

class SubscriptionRepository {
  async create(user_id, event_id) {
    const query = `
      INSERT INTO subscriptions (user_id, event_id)
      VALUES ($1, $2) RETURNING *`;
    const values = [user_id, event_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const query = 'SELECT * FROM subscriptions ORDER BY id';
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = 'SELECT * FROM subscriptions WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByUserId(user_id) {
    const query = 'SELECT * FROM subscriptions WHERE user_id = $1';
    const values = [user_id];
    const result = await pool.query(query, values);
    return result.rows;
  }

  async findByEventId(event_id) {
    const query = 'SELECT * FROM subscriptions WHERE event_id = $1';
    const values = [event_id];
    const result = await pool.query(query, values);
    return result.rows;
  }

  async findByUserAndEvent(user_id, event_id) {
    const query = 'SELECT * FROM subscriptions WHERE user_id = $1 AND event_id = $2';
    const values = [user_id, event_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, user_id, event_id) {
    const query = `
      UPDATE subscriptions
      SET user_id = $1, event_id = $2
      WHERE id = $3
      RETURNING *`;
    const values = [user_id, event_id, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM subscriptions WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findWithDetails() {
    const query = `
      SELECT s.id, s.user_id, s.event_id,
             u.nome as user_nome, u.email as user_email,
             e.titulo as event_titulo, e.data as event_data, e.local as event_local
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      JOIN events e ON s.event_id = e.id
      ORDER BY e.data`;
    const result = await pool.query(query);
    return result.rows;
  }

  async countByEventId(event_id) {
    const query = 'SELECT COUNT(*) FROM subscriptions WHERE event_id = $1';
    const values = [event_id];
    const result = await pool.query(query, values);
    return parseInt(result.rows[0].count);
  }
}

module.exports = new SubscriptionRepository();