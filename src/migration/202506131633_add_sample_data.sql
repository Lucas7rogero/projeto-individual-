INSERT INTO users (nome, email, senha) VALUES
  ('João Silva', 'joao.silva@example.com', 'senha123'),
  ('Maria Souza', 'maria.souza@example.com', 'senha456');

INSERT INTO events (titulo, descricao, local, data, user_id) VALUES
  ('Conferência de Tecnologia', 'Uma conferência sobre as últimas tendências em tecnologia.', 'Centro de Convenções', '2025-07-15 09:00:00', (SELECT id FROM users WHERE email = 'joao.silva@example.com')),
  ('Workshop de Programação', 'Workshop prático de programação para iniciantes.', 'Espaço Maker', '2025-08-01 14:00:00', (SELECT id FROM users WHERE email = 'maria.souza@example.com'));

INSERT INTO subscriptions (user_id, event_id) VALUES
  ((SELECT id FROM users WHERE email = 'joao.silva@example.com'), (SELECT id FROM events WHERE titulo = 'Conferência de Tecnologia')),
  ((SELECT id FROM users WHERE email = 'maria.souza@example.com'), (SELECT id FROM events WHERE titulo = 'Workshop de Programação'));

