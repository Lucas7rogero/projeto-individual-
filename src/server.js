const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");

const app = express();
const port = 3000;

// Configurar EJS como template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (CSS, JS, imagens)
app.use("/public", express.static(path.join(__dirname, "public")));

// Rotas para views (páginas)
app.get("/", async (req, res) => {
  res.redirect("/eventos");
});

app.get("/eventos", async (req, res) => {
  try {
    res.render("eventos/index");
  } catch (error) {
    console.error("Erro ao carregar página de eventos:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.get("/eventos/novo", (req, res) => {
  res.render("eventos/form", {
    evento: null,
    action: "/api/events",
    method: "POST",
    titulo: "Criar Novo Evento",
  });
});

app.get("/eventos/editar/:id", (req, res) => {
  res.render("eventos/form", {
    evento: { id: req.params.id },
    action: `/api/events/${req.params.id}`,
    method: "PUT",
    titulo: "Editar Evento",
  });
});

app.get("/usuarios", (req, res) => {
  res.render("usuarios/index");
});

app.get("/usuarios/novo", (req, res) => {
  res.render("usuarios/form", {
    usuario: null,
    action: "/api/users",
    method: "POST",
    titulo: "Criar Novo Usuário",
  });
});

app.get("/inscricoes", (req, res) => {
  res.render("inscricoes/index");
});

// Usando as rotas da API
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
});
