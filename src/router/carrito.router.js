const express = require("express");
const carritoRouter = express.Router();

const controller = require("../controllers/carrito.controller");

carritoRouter.get("/", controller.getAll);

module.exports = carritoRouter;
