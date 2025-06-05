# Plataforma de Eventos — Projeto Individual (Módulo 2, Parte 3 de Computação)

Este é um sistema web completo desenvolvido com **Node.js**, **Express.js**, **EJS**, **PostgreSQL** e **CSS**, que permite o **gerenciamento de eventos, usuários e inscrições**.  
O objetivo é oferecer uma **plataforma funcional** com **interface interativa**, conectada ao backend e banco de dados, simulando um sistema real de gestão de eventos (workshops, palestras, etc).


## 📁 Estrutura de Pastas

```txt
plataforma-eventos/
├── assets/
├── documentos/
├── node_modules/
├── src/
│   ├── controllers/
│   │    └── EventController.js
│   │    └── SubscriptionController.js
│   │    └── UserController.js
│   ├── migration/
│   │    └── 202505201029.sql
│   │    └── runSQLscript.js
│   ├── models/
│   │    └── EventModel.js
│   │    └── SubscriptionModel.js
│   │    └── UserModel.js
│   ├── routes/
│   │    └── index.js
│   └── views/              # Views EJS
│        └── home.ejs
│        └── events.ejs
│        └── event-form.ejs
│        └── subscriptions.ejs
│        └── users.ejs
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── readme.md
├── server.js
├── wad.md
```

## Como executar o projeto localmente

**1. Instale as dependências**
bash
Copiar
Editar
npm install
2. Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto com os dados de conexão com o banco:

env
Copiar
Editar
DB_USER="postgres.xxkarnrbvpgcxfhhlwcx"
DB_HOST="aws-0-us-east-2.pooler.supabase.com"
DB_DATABASE="postgres"
DB_PASSWORD="yGoBuSNEMLC9WWnB"
DB_PORT="6543"
DB_SSL="true"
3. Execute o script de criação do banco (opcional)
bash
Copiar
Editar
node src/migration/runSQLscript.js
4. Inicie o servidor
bash
Copiar
Editar
node server.js
5. Acesse no navegador
arduino
Copiar
Editar
http://localhost:3000
🌐 Rotas da API
Usuários
GET /api/users

POST /api/users

PUT /api/users/:id

DELETE /api/users/:id

Eventos
GET /api/events

POST /api/events

PUT /api/events/:id

DELETE /api/events/:id

Inscrições
GET /api/subscriptions

POST /api/subscriptions

PUT /api/subscriptions/:id

DELETE /api/subscriptions/:id

## 💻 Views Desenvolvidas (/src/views/)

- **form.ejs: Página inicial/Formulário**

- **index.ejs: Lista com os usuários cadastrados**

As views usam EJS e estão conectadas ao banco via controllers e rotas Express, com res.render(...).

🔁 Integração com Fetch API
A interface interativa utiliza Fetch API para chamadas AJAX:

js
Copiar
Editar
// Exemplo: cadastro de evento
fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'Evento A', data: '2025-06-10' })
});
Essa abordagem permite atualizar a interface sem recarregar a página.

## 🎨 Estilização (CSS)

- Layout responsivo e organizado

- Feedback visual em botões e formulários

- Utilização de Flexbox e Grid

- Cores e fontes consistentes com acessibilidade

## 🧱 Tecnologias Utilizadas

- Node.js

- Express.js

- EJS

- PostgreSQL

- JavaScript (Fetch API)

- CSS

- Dotenv

- Arquitetura MVC

## 🗃️ Banco de Dados

**Entidades:**

- users — Usuários do sistema

- events — Eventos disponíveis

- subscriptions — Inscrições em eventos


**Modelo físico (SQL):**

- ./src/migration/202505201029.sql

**Modelo relacional (visual):**

- banco-relacional.svg


## 📄 Licença
**Este projeto é acadêmico, desenvolvido no Instituto de Tecnologia e Liderança (Inteli), como parte da disciplina de Computação (Módulo 2)**