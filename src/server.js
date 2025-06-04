const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const UserController = require("./controllers/userController");
const TaskController = require("./controllers/taskController");

const app = express();
const userController = new UserController();
const taskController = new TaskController();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.get("/", (req, res) => res.redirect("/login"));

app.get("/login", (req, res) => res.render("login"));
app.post("/login", (req, res) => userController.login(req, res));

app.get("/cadastro", (req, res) => res.render("cadastro"));
app.post("/cadastro", (req, res) => userController.cadastrar(req, res));

app.get("/tasks", (req, res) => taskController.listar(req, res));
app.post("/tasks", (req, res) => taskController.adicionar(req, res));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
