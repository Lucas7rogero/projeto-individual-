const express = require("express");
const router = express.Router();

const inscricoes = [];
const eventos = [
  { id: 1, titulo: "Pagode", data: "2024-06-10", local: "Salão A", organizador: "Equipe Pagode" },
  { id: 2, titulo: "Rock", data: "2024-06-15", local: "Salão B", organizador: "Equipe Rock" },
  { id: 3, titulo: "Sertanejo", data: "2024-06-20", local: "Salão C", organizador: "Equipe Sertanejo" }
];

// Página inicial de cadastro
router.get("/", (req, res) => {
  res.render("inicio/cadastro");
});

// Recebe o cadastro e salva inscrição
router.post("/cadastrar", (req, res) => {
  const { nome, email, senha, idade, eventos } = req.body;

  let eventosEscolhidos = [];
  if (Array.isArray(eventos)) {
    eventosEscolhidos = eventos;
  } else if (typeof eventos === "string") {
    eventosEscolhidos = [eventos];
  }
  inscricoes.push({ nome, email, senha, idade, eventos: eventosEscolhidos });
  res.redirect("/confirmacao");
});

// Página de confirmação
router.get("/confirmacao", (req, res) => {
  res.render("inicio/confirmacao");
});

// Página de eventos
router.get("/eventos", (req, res) => {
  res.render("eventos/index", { eventos });
});

// Página de lista de inscrições
router.get("/lista", (req, res) => {
  res.render("lista/index", { inscricoes });
});

module.exports = router;