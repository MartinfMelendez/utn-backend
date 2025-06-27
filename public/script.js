const contenedor = document.querySelector(".container-card");

async function crear() {
  const res = await fetch("http://localhost:3000/productos");
  const data = await res.json();

  contenedor.innerHTML = "";
  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `        <h3 >${element.nombre}</h3>
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
    desplegable.appendChild(opcion);
  });
}
cargarCategorias();
crear();
