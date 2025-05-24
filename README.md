# Plataforma de Eventos — Projeto Individual (Módulo 2, Parte I de Computação)

Este é um sistema web desenvolvido com Node.js e Express.js para o gerenciamento de eventos e inscrições.

O objetivo deste projeto é oferecer uma plataforma que permita a criação, visualização e inscrição em eventos. A aplicação será usada para simular um sistema real de gestão de eventos como workshops, palestras ou encontros comunitários, com foco em simplicidade, eficiência e boas práticas de desenvolvimento.

---

## Estrutura de Pastas

```plataforma-eventos/
├── assets/
├── documentos/
├── node_modules/
├── src/
│   └── controllers/
│   │    └── EventController.js
│   │    └── SubscriptionController.js
│   │    └── UserController.js
│   └── migration/
│   │    └── .sql
│   │    └── runSQLscript.js
│   └── models/
│   │    └── EventModel.js
│   │    └── SubscriptionModel.js
│   │    └── UserModel.js
│   └── routes/
│   │    └── index.js
│   └── routes/
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── readme.md
├── server.js
├── wad.js

```

## Como executar o projeto localmente

### 1. Instale as dependências

```
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com as seguintes informações:

```
DB_USER="postgres.xxkarnrbvpgcxfhhlwcx"
DB_HOST="aws-0-us-east-2.pooler.supabase.com"
DB_DATABASE="postgres"
DB_PASSWORD="yGoBuSNEMLC9WWnB"
DB_PORT="6543"
DB_SSL="true"
```

### 3. Inicie o servidor

```
node server.js
```

### 4. Abra no navegador

http://localhost:3000

## Endpoints da API

### Usuários

- `POST /api/users` - Criar novo usuário  
- `GET /api/users` - Listar todos os usuários  
- `PUT /api/users/:id` - Editar usuário  
- `DELETE /api/users/:id` - Excluir usuário  

### Eventos

- `POST /api/events` - Criar novo evento  
- `GET /api/events` - Listar eventos  
- `PUT /api/events/:id` - Editar evento  
- `DELETE /api/events/:id` - Excluir evento  

### Inscrições

- `POST /api/subscriptions` - Criar inscrição  
- `GET /api/subscriptions` - Listar inscrições  
- `PUT /api/subscriptions/:id` - Editar inscrição  
- `DELETE /api/subscriptions/:id` - Excluir inscrição  


## Tecnologias Utilizadas

- Node.js

- Express.js

- EJS

- PostgreSQL

- Dotenv

- MVC Pattern

## Modelo de Banco de Dados

Entidades principais:

users — Armazena os usuários do sistema (nome, e-mail, senha)

events — Armazena os eventos (nome, descrição, local, data)

subscriptions — Armazena as inscrições dos usuários em eventos

### O modelo físico (código SQL) está em:

- ./src/migration/202505201029.sql

### O modelo relacional (diagrama visual) está em:

- banco-relacional.svg

# Licença

Este projeto é acadêmico do Instituto de Tecnologia e Liderança (Inteli).
