const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

let inscricoes = [];
let nextId = 1;

// Middleware para suportar PUT/DELETE via ?_method
router.use(methodOverride("_method"));

// Página inicial: formulário de cadastro
router.get("/", (req, res) => {
  res.render("usuarios/form", { usuario: null });
});

// Página para novo cadastro
router.get("/usuarios/novo", (req, res) => {
  res.render("usuarios/form", { usuario: null });
});

// Cadastrar nova inscrição
router.post("/usuarios", (req, res) => {
  const { nome, idade, evento } = req.body;
  inscricoes.push({ id: nextId++, nome, idade, evento });
  res.redirect("/inscricoes");
});

// Listar inscrições
router.get("/inscricoes", (req, res) => {
  res.render("inscricoes/index", { inscricoes });
});

// Página de edição
router.get("/usuarios/:id/edit", (req, res) => {
  const usuario = inscricoes.find(u => u.id == req.params.id);
  if (!usuario) return res.redirect("/inscricoes");
  res.render("usuarios/form", { usuario });
});

// Atualizar inscrição
router.post("/usuarios/:id", (req, res) => {
  const usuario = inscricoes.find(u => u.id == req.params.id);
  if (usuario) {
    usuario.nome = req.body.nome;
    usuario.idade = req.body.idade;
    usuario.evento = req.body.evento;
  }
  res.redirect("/inscricoes");
});

// Excluir inscrição
router.delete("/usuarios/:id", (req, res) => {
  inscricoes = inscricoes.filter(u => u.id != req.params.id);
  res.redirect("/inscricoes");
});

module.exports = router;