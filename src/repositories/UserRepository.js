const pool = require('../config/db');

class UserRepository {
  async create(nome, email, senha) {
    const query = `
      INSERT INTO users (nome, email, senha)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [nome, email, senha];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const query = 'SELECT * FROM users ORDER BY id';
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, nome, email, senha) {
    const query = `
      UPDATE users
      SET nome = $1, email = $2, senha = $3
      WHERE id = $4 RETURNING *`;
    const values = [nome, email, senha, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new UserRepository();