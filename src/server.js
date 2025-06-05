require("dotenv").config();
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
});