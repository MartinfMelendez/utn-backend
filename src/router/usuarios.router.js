const express = require("express");
const usuariosRouter = express.Router();
const auth = require("../controllers/auth.controller");

const controller = require("../controllers/usuarios.controller");

usuariosRouter.get("/", controller.getAll);
usuariosRouter.get("/email", controller.getOne);
usuariosRouter.post("/", controller.createUsuario);
usuariosRouter.put("/:id", controller.modificarUsuario);
usuariosRouter.delete("/", controller.removeSeguro);

usuariosRouter.post("/login", auth.loguin);
usuariosRouter.get("/protegida", auth.protegida);

module.exports = usuariosRouter;
