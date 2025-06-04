const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", routes);

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

app.get("/usuarios/novo", (req, res) => {
  res.render("usuarios/form", {
    usuario: null,
    action: "/api/users",
    method: "POST",
    titulo: "Criar Novo Usuário",
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
});
