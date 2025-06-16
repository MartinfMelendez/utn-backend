const express = require("express");
const carritoRouter = express.Router();

const controller = require("../controllers/carrito.controller");

carritoRouter.get("/", controller.getAll);
carritoRouter.get("/:id_carrito/:id_usuario", controller.getOne);
carritoRouter.post("/", controller.create);

module.exports = carritoRouter;
