const express = require("express");
const usuariosRouter = express.Router();

const controller = require("../controllers/usuarios.controller");

usuariosRouter.get("/", controller.getAll);
usuariosRouter.get("/:id", controller.getOne);
usuariosRouter.post("/", controller.createUsuario);
usuariosRouter.delete("/:id", controller.remove);

module.exports = usuariosRouter;
