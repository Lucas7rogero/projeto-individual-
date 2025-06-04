const express = require("express");
const router = express.Router();

const inscricoes = [];

router.get("/", (req, res) => {
  res.render("inicio/cadastro");
});

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

router.get("/confirmacao", (req, res) => {
  res.render("inicio/confirmacao");
});

router.get("/lista", (req, res) => {
  res.render("eventos/index", { inscricoes });
});

module.exports = router;
