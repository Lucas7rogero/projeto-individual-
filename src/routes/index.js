const express = require("express");
const router = express.Router();

const inscricoes = [];

router.get("/", (req, res) => {
  res.render("usuarios/form");
});

router.post("/usuarios", (req, res) => {
  const { nome, idade, evento } = req.body;
  inscricoes.push({ nome, idade, evento });
  res.redirect("/inscricoes");
});

router.get("/inscricoes", (req, res) => {
  res.render("inscricoes/index", { inscricoes });
});

module.exports = router;
