const pool = require('../config/db');

class EventRepository {
  async create(titulo, descricao, local, data, user_id) {
    const query = `
      INSERT INTO events (titulo, descricao, local, data, user_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [titulo, descricao, local, data, user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const query = 'SELECT * FROM events ORDER BY id';
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = 'SELECT * FROM events WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByUserId(user_id) {
    const query = 'SELECT * FROM events WHERE user_id = $1 ORDER BY data';
    const values = [user_id];
    const result = await pool.query(query, values);
    return result.rows;
  }

  async update(id, titulo, descricao, local, data, user_id) {
    const query = `
      UPDATE events
      SET titulo = $1, descricao = $2, local = $3, data = $4, user_id = $5
      WHERE id = $6 RETURNING *`;
    const values = [titulo, descricao, local, data, user_id, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findWithUserDetails() {
    const query = `
      SELECT e.*, u.nome as criador_nome, u.email as criador_email
      FROM events e
      JOIN users u ON e.user_id = u.id
      ORDER BY e.data`;
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = new EventRepository();