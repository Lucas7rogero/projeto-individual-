const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");
const SubscriptionService = require("../services/SubscriptionService");
const UserService = require("../services/UserService");
const EventService = require("../services/EventService");

router.use(methodOverride("_method"));

router.get("/", (req, res) => {
  res.redirect("/usuarios/novo");
});

router.get("/usuarios/novo", (req, res) => {
  res.render("usuarios/form", { usuario: null });
});

router.post("/usuarios", async (req, res) => {
  console.log("REQ.BODY:", req.body);
  try {
    const { nome, email, senha, evento } = req.body;

    if (!nome || !email || !senha || !evento) {
      return res.status(400).send("Todos os campos são obrigatórios");
    }

    let user = await UserService.getAllUsers();
    user = user.find((u) => u.email === email);
    if (!user) {
      user = await UserService.createUser(nome, email, senha);
    }

    let eventos = await EventService.getAllEvents();
    let eventoObj = eventos.find((e) => e.titulo === evento);
    if (!eventoObj) {
      return res.status(400).send("Evento não encontrado.");
    }

    await SubscriptionService.createSubscription(user.id, eventoObj.id);

    res.redirect("/inscricoes");
  } catch (err) {
    res.status(400).send("Erro ao cadastrar inscrição: " + err.message);
  }
});

router.get("/inscricoes", async (req, res) => {
  const inscricoes = await SubscriptionService.getSubscriptionsWithDetails();
  res.render("inscricoes/index", { inscricoes });
});

router.get("/usuarios/:id/edit", async (req, res) => {
  const inscricao = await SubscriptionService.getSubscriptionById(
    req.params.id
  );
  if (!inscricao) return res.redirect("/inscricoes");
  const user = await UserService.getUserById(inscricao.user_id);
  const event = await EventService.getEventById(inscricao.event_id);
  res.render("usuarios/form", {
    usuario: {
      id: inscricao.id,
      nome: user.nome,
      email: user.email,
      senha: "",
      evento: event.titulo,
    },
  });
});

router.post("/usuarios/:id", async (req, res) => {
  try {
    const { nome, email, senha, evento } = req.body;
    const inscricao = await SubscriptionService.getSubscriptionById(
      req.params.id
    );

    await UserService.updateUser(
      inscricao.user_id,
      nome,
      email,
      senha || "123456"
    );

    let eventos = await EventService.getAllEvents();
    let eventoObj = eventos.find((e) => e.titulo === evento);
    if (!eventoObj) {
      return res.status(400).send("Evento não encontrado.");
    }

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

router.delete("/usuarios/:id", async (req, res) => {
  try {
    await SubscriptionService.deleteSubscription(req.params.id);
    res.redirect("/inscricoes");
  } catch (err) {
    res.status(400).send("Erro ao excluir inscrição: " + err.message);
  }
});

router.delete("/api/subscriptions/:id", async (req, res) => {
  try {
    await SubscriptionService.deleteSubscription(req.params.id);
    res.status(200).json({ message: "Inscrição excluída com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir inscrição:", err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
