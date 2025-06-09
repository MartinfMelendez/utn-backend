const express = require("express");
const dbRouter = express.Router();

const controller = require("../controllers/marca.controller");

dbRouter.get("/", controller.getAll);
dbRouter.get("/:id", controller.getOne);
dbRouter.post("/", controller.createMarca);
dbRouter.put("/:id", controller.modificarMarca);
dbRouter.delete("/:id", controller.removeMacar);
module.exports = dbRouter;
