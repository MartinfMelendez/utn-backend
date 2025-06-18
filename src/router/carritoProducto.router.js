const express = require("express");
const carritoProductoRouter = express.Router();
const controller = require("../controllers/carritoProducto.controller");

carritoProductoRouter.get("/", controller.getAll);
carritoProductoRouter.get("/:id", controller.getOne);
carritoProductoRouter.post("/", controller.create);
carritoProductoRouter.delete("/:id", controller.delete);

module.exports = carritoProductoRouter;
