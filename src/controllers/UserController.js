const bcrypt = require("bcrypt");

class UserController {
  constructor() {
    this.usuarios = [];
    this.idCounter = 1;
  }

  cadastrar(req, res) {
    const { nome, senha } = req.body;
    const hash = bcrypt.hashSync(senha, 10);
    const novoUsuario = { id: this.idCounter++, nome, senha: hash };
    this.usuarios.push(novoUsuario);
    console.log("Usuário cadastrado:", novoUsuario);
    res.redirect("/login");
  }

  login(req, res) {
    const { nome, senha } = req.body;
    const usuario = this.usuarios.find((u) => u.nome === nome);
    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      res.render("tasks", { userId: usuario.id });
      console.log("Login bem-sucedido:", usuario);
    } else {
      res.send("Login inválido!");
    }
  }
}

module.exports = UserController;
