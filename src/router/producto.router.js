const express = require("express");
const productoRouter = express.Router();
const upload = require("../config/multer");

const controller = require("../controllers/producto.controller");

productoRouter.get("/", controller.getAll);
productoRouter.get("/:id", controller.getOne);
productoRouter.post("/", upload.single("imagen"), controller.createProduct);
productoRouter.put("/:id", controller.modificarProducto);
productoRouter.delete("/:id", controller.removeProducto);

module.exports = productoRouter;
