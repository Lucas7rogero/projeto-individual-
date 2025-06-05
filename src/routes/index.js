const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");
const SubscriptionService = require("../services/SubscriptionService");
const UserService = require("../services/UserService");
const EventService = require("../services/EventService");

router.use(methodOverride("_method"));

// Página inicial: redireciona para novo cadastro
router.get("/", (req, res) => {
  res.redirect("/usuarios/novo");
});

// Página para novo cadastro
router.get("/usuarios/novo", (req, res) => {
  res.render("usuarios/form", { usuario: null });
});

// Cadastrar nova inscrição (usuário escolhe evento fixo)
router.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha, evento } = req.body;

    // Validação básica
    if (!nome || !email || !senha || !evento) {
      return res.status(400).send("Todos os campos são obrigatórios");
    }

    // Cria usuário se não existir
    let user = await UserService.getAllUsers();
    user = user.find(u => u.email === email);
    if (!user) {
      user = await UserService.createUser(nome, email, senha);
    }

    // Busca o evento pelo título fixo (ROCK, SAMBA, FUNK, PAGODE, SERTANEJO)
    let eventos = await EventService.getAllEvents();
    let eventoObj = eventos.find(e => e.titulo === evento);
    if (!eventoObj) {
      return res.status(400).send("Evento não encontrado.");
    }

    // Cria inscrição
    await SubscriptionService.createSubscription(user.id, eventoObj.id);

    res.redirect("/inscricoes");
  } catch (err) {
    res.status(400).send("Erro ao cadastrar inscrição: " + err.message);
  }
});

// Listar inscrições
router.get("/inscricoes", async (req, res) => {
  const inscricoes = await SubscriptionService.getSubscriptionsWithDetails();
  res.render("inscricoes/index", { inscricoes });
});

// Página de edição
router.get("/usuarios/:id/edit", async (req, res) => {
  const inscricao = await SubscriptionService.getSubscriptionById(req.params.id);
  if (!inscricao) return res.redirect("/inscricoes");
  const user = await UserService.getUserById(inscricao.user_id);
  const event = await EventService.getEventById(inscricao.event_id);
  res.render("usuarios/form", {
    usuario: {
      id: inscricao.id,
      nome: user.nome,
      email: user.email,
      senha: "",
      evento: event.titulo
    }
  });
});

// Atualizar inscrição (atualiza usuário e evento relacionados)
router.post("/usuarios/:id", async (req, res) => {
  try {
    const { nome, email, senha, evento } = req.body;
    const inscricao = await SubscriptionService.getSubscriptionById(req.params.id);

    // Atualiza usuário
    await UserService.updateUser(
      inscricao.user_id,
      nome,
      email,
      senha || "123456"
    );

    // Busca o evento pelo título fixo
    let eventos = await EventService.getAllEvents();
    let eventoObj = eventos.find(e => e.titulo === evento);
    if (!eventoObj) {
      return res.status(400).send("Evento não encontrado.");
    }

    // Atualiza inscrição para novo evento (se necessário)
    await SubscriptionService.updateSubscription(
      inscricao.id,
      inscricao.user_id,
      eventoObj.id
    );

    res.redirect("/inscricoes");
  } catch (err) {
    res.status(400).send("Erro ao atualizar inscrição: " + err.message);
  }
});

// Excluir inscrição
router.delete("/usuarios/:id", async (req, res) => {
  try {
    await SubscriptionService.deleteSubscription(req.params.id);
    res.redirect("/inscricoes");
  } catch (err) {
    res.status(400).send("Erro ao excluir inscrição: " + err.message);
  }
});

module.exports = router;