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
  try {
    const { nome, email, senha, titulo, descricao, local, data } = req.body;


    let user = await UserService.getAllUsers();
    user = user.find((u) => u.email === email);
    if (!user) {
      user = await UserService.createUser(nome, email, senha);
    }


    let eventos = await EventService.getAllEvents();
    let evento = eventos.find(
      (e) =>
        e.titulo === titulo &&
        e.data.toISOString().slice(0, 16) === data &&
        e.local === local
    );
    if (!evento) {
      evento = await EventService.createEvent(
        titulo,
        descricao,
        local,
        data,
        user.id
      );
    }

    await SubscriptionService.createSubscription(user.id, evento.id);

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
      senha: "", // não exibe senha
      titulo: event.titulo,
      descricao: event.descricao,
      local: event.local,
      data: event.data.toISOString().slice(0, 16),
    },
  });
});


router.post("/usuarios/:id", async (req, res) => {
  try {
    const { nome, email, senha, titulo, descricao, local, data } = req.body;
    const inscricao = await SubscriptionService.getSubscriptionById(
      req.params.id
    );


    await UserService.updateUser(
      inscricao.user_id,
      nome,
      email,
      senha || "123456"
    );


    await EventService.updateEvent(
      inscricao.event_id,
      titulo,
      descricao,
      local,
      data,
      inscricao.user_id
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

module.exports = router;
