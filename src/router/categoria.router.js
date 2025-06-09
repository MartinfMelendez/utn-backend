const express = require("express");
const categoriaRouter = express.Router();
const controller = require("../controllers/categoria.controller");

categoriaRouter.get("/", controller.getAll);
categoriaRouter.get("/:id", controller.getOne);
categoriaRouter.post("/", controller.create);
categoriaRouter.put("/:id", controller.modificar);
categoriaRouter.delete("/:id", controller.remove);

module.exports = categoriaRouter;
