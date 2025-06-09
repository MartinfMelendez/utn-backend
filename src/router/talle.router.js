const express = require("express");
const talleRouter = express.Router();

const controller = require("../controllers/talle.controller");

talleRouter.get("/", controller.getAll);
talleRouter.get("/:id", controller.getOne);
talleRouter.post("/", controller.createTalle);
talleRouter.put("/:id", controller.modificarTalle);
talleRouter.delete("/:id", controller.remove);

module.exports = talleRouter;
