//Se crean las variables
const btnBuscar = document.getElementById("btn-buscar");
const inputBuscar = document.getElementById("input-buscar");

//Esta es la funcion que se utiliza para Crear las CARD
function crearCards(data) {
  const contenedor = document.querySelector(".container-card");
  contenedor.innerHTML = "";
  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `  <img src='${element.imagen_url}'></img>
          <h3 >${element.pNombre.toUpperCase()}</h3>
        <p>${element.descripcion}</p>
        <p>Cantidad:</p>
             <div class="cantidad-container">
        <button class="menos">-</button>
        <input type="number" readonly class='cantidad' value='1'></input>
        <button class="mas">+</button>
      </div>
        <p>$${element.precio}</p>
        <button class='agregar' value='${element.id}'>Agregar</button>`; //El value se utiliza para hacer referencia al id de los productos
    contenedor.appendChild(card);
  });
}

//Funcion para cargar las categorias
async function cargarCategorias() {
  const desplegable = document.getElementById("descripcion");
  const res = await fetch("http://localhost:3000/categorias");
  const datos = await res.json();
  desplegable.innerHTML = ""; //Limpio el desplegable
  const opcionTodos = document.createElement("option");
  opcionTodos.textContent = "Todos los productos"; // Valor por defecto
  opcionTodos.value = "todos";
  desplegable.appendChild(opcionTodos);
  datos.forEach((element) => {
    const opcion = document.createElement("option");
    opcion.value = element.nombre;
    opcion.id = element.id_categoria;
    opcion.textContent = element.nombre;
    opcion.className = "category";
    desplegable.appendChild(opcion);
  });
}

//Esta funcion permite cargar las CARDS y las CATEGORIAS al iniciar el DOM
document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("http://localhost:3000/productos");
  const data = await res.json();
  crearCards(data);
  cargarCategorias();
});

//Funcion para filtrar productos en base a la categoria
const select = document.querySelector("#descripcion");
select.addEventListener("change", async () => {
  const valor = select.value; // Aquí obtienes el valor seleccionado
  const res = await fetch("http://localhost:3000/productos");
  const data = await res.json();

  if (valor === "todos") {
    crearCards(data);
    return;
  }
  const filtro = data.filter((x) => x.cNombre == valor);
  crearCards(filtro);
});

//Funcion para filtrar productos al buscar por input
btnBuscar.addEventListener("click", async () => {
  const producto = document.querySelector(".buscar").value.trim().toUpperCase();
  const res = await fetch("http://localhost:3000/productos");
  const data = await res.json();
  const filtrado = data.filter((x) =>
    x.pNombre.toUpperCase().includes(producto)
  );
  if (producto === "") {
    Toastify({
      text: "Complete el campo de busqueda",
      duration: 2000,
      style: {
        background:
          "linear-gradient(to right,rgb(255, 0, 51),rgb(201, 61, 61))",
      },
    }).showToast();
    return;
  }

  if (filtrado.length == 0) {
    Toastify({
      text: "No hay articulos con esa descripcion",
      duration: 1000,
      style: {
        background: "linear-gradient(to right, #96c93d, #00b09b)",
      },
    }).showToast();
    return;
  }

  crearCards(filtrado);
});
//Se agrega que cuanddo el input este vacio vuelva a cargar todas las CARD
inputBuscar.addEventListener("input", async () => {
  const producto = document.querySelector(".buscar").value.trim().toUpperCase();
  const res = await fetch("http://localhost:3000/productos");
  const data = await res.json();
  if (producto === "") {
    crearCards(data);
  }
});

//Funcion para filtrar por rango de precio

document.getElementById("btn-filtrar").addEventListener("click", async () => {
  const res = await fetch("http://localhost:3000/productos");
  const data = await res.json();

  const mayor = data.reduce((max, monto) => (monto.precio < max ? monto : max));

  const min = Number(document.getElementById("precio-min").value);
  const max = Number(document.getElementById("precio-max").value) || mayor;

  if (min < 0 || max < 0) {
    Toastify({
      text: "El precio minimo o maximo no puede ser menor a 0",
      duration: 2000,
      position: "center",
      style: {
        background: "linear-gradient(to right,rgb(255, 74, 74),rgb(255, 0, 0))",
      },
    }).showToast();
    return;
  }
  const filtrados = data.filter(
    (element) => element.precio >= min && element.precio <= max
  );
  crearCards(filtrados);
});
