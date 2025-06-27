//Se importa morgan
const morgan = require("morgan");

require("dotenv").config();

//importar express
const express = require("express");
//Importamos CORS()
const cors = require("cors");
//Importacion de Handlebars
const hbs = require("express-handlebars");

//Importacion de los Router
const marca = require("./src/router/marca.router");
const categorias = require("./src/router/categoria.router");
const productos = require("./src/router/producto.router");
const usuarios = require("./src/router/usuarios.router");
const talle = require("./src/router/talle.router");
const carrito = require("./src/router/carrito.router");
const carritoProducto = require("./src/router/carritoProducto.router");
const auth = require("./src/router/auth");
const views = require("./src/router/views.router");

const pool = require("./src/database/db");

const app = express(); //Se crea la app

const PORT = process.env.PORT; //Elijo puerto a utilizar

//Configuracion Handlebars
app.engine("handlebars", hbs.engine({ partialsDir: "./src/views/partials" }));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.json()); //Comando para parsear JSON al body
app.use(cors());
app.use("/public", express.static("public")); //Comando para leer archivos estaticos

//Para utilizar el Router se usa la palabra use--> app.use(direccion, router)
app.use("/marca", marca);
app.use("/categorias", categorias);
app.use("/productos", productos);
app.use("/usuarios", usuarios);
app.use("/talle", talle);
app.use("/carrito", carrito);
app.use("/carrito_producto", carritoProducto);

app.use("/auth", auth);
app.use("/auth", views);

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server escuchando http://localhost:${PORT}/usuarios`);
});
