const expres = require("express");
const authRouter = expres.Router();
const controller = require("../controllers/auth.controller");
//Se crea la ruta para el login

authRouter.post("/login", controller.loguin);

authRouter.get("/protegida", controller.protegida);

module.exports = authRouter;
