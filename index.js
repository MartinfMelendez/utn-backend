//importar express
const express = require("express");
const hbs = require("express-handlebars");

const marca = require("./src/router/marca.router");
const categorias = require("./src/router/categoria.router");
const productos = require("./src/router/producto.router");
const usuarios = require("./src/router/usuarios.router");
const talle = require("./src/router/talle.router");

const pool = require("./src/database/db");

const app = express(); //Se crea la app
const PORT = process.env.PORT; //Elijo puerto a utilizar

//Configuracion Handlebars
app.engine("handlebars", hbs.engine({ partialsDir: "./src/views/partials" }));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.json()); //Comando para parsear JSON al body
app.use(express.static("public")); //Comando para leer archivos estaticos

//Para utilizar el Router se usa la palabra use--> app.use(direccion, router)

app.use("/marca", marca);
app.use("/categorias", categorias);
app.use("/productos", productos);
app.use("/usuarios", usuarios);
app.use("/talle", talle);

app.listen(PORT, () => {
  console.log(`Server escuchando http://localhost:${PORT}`);
});
