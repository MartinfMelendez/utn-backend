const express = require("express");
const productoRouter = express.Router();

const controller = require("../controllers/producto.controller");

productoRouter.get("/", controller.getAll);
productoRouter.get("/:id", controller.getOne);
productoRouter.post("/", controller.createProduct);

module.exports = productoRouter;
