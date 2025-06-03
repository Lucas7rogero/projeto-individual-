// routes/index.js
const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");
const SubscriptionController = require("../controllers/SubscriptionController");
const UserController = require("../controllers/UserController");

// Rotas Event
router.post("/events", EventController.criarEvent);
router.get("/events", EventController.listarEvents);
router.put("/events/:id", EventController.editarEvent);
router.delete("/events/:id", EventController.excluirEvent);

// Rotas Subscription
router.post("/subscriptions", SubscriptionController.criarSubscription);
router.get("/subscriptions", SubscriptionController.listarSubscriptions);
router.put("/subscriptions/:id", SubscriptionController.editarSubscription);
router.delete("/subscriptions/:id", SubscriptionController.excluirSubscription);

// Rotas User
router.post("/users", UserController.criarUser);
router.get("/users", UserController.listarUsers);
router.put("/users/:id", UserController.editarUser);
router.delete("/users/:id", UserController.excluirUser);

module.exports = router;
