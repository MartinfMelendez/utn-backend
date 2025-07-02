//Cargo por defecto las categorias y las marcas
document.addEventListener("DOMContentLoaded", async () => {
  loadCategory();
  loadMarca();
  document.querySelector(".ocultar").style.display = "none";
});

//Funcion para cargar las categorias en los desplegables
async function loadCategory() {
  const res = await fetch("http://localhost:3000/categorias");
  const datos = await res.json();
  const desplegable = document.getElementById("prod_categoria");
  desplegable.innerHTML = ""; //Limpio el desplegable
  const opcionTodos = document.createElement("option");
  opcionTodos.textContent = "Ninguna"; // Valor por defecto
  opcionTodos.value = null;
  desplegable.appendChild(opcionTodos);
  datos.forEach((element) => {
    const opcion = document.createElement("option");
    opcion.value = element.id_categoria;
    opcion.textContent = element.nombre;
    opcion.className = "category";
    desplegable.appendChild(opcion);
  });
}
//Funcion para cargar las marcas en los desplegables
async function loadMarca() {
  const res = await fetch("http://localhost:3000/marca");
  const datos = await res.json();
  const desplegable = document.getElementById("prod_marca");
  desplegable.innerHTML = ""; //Limpio el desplegable
  const opcionTodos = document.createElement("option");
  opcionTodos.textContent = "Ninguna"; // Valor por defecto
  opcionTodos.value = null;
  desplegable.appendChild(opcionTodos);
  datos.forEach((element) => {
    const opcion = document.createElement("option");
    opcion.value = element.id_marca;
    opcion.textContent = element.nombre;
    opcion.className = "category";
    desplegable.appendChild(opcion);
  });
}

//Logica para cargar un producto nuevo

document
  .getElementById("productoForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("nombre", form.prod_nombre.value);
    formData.append("descripcion", form.prod_descripcion.value);
    formData.append("precio", form.prod_precio.value);
    formData.append("marca_id", form.prod_marca.value);
    formData.append("categoria_id", form.prod_categoria.value);

    // Esto es clave: accedés al archivo subido
    const file = form.prod_imagen.files[0];
    formData.append("imagen", file); // 'archivo' debe coincidir con el nombre usado en uploader.single('archivo')

    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        body: formData, // NO poner Content-Type, fetch lo hace solo con FormData
      });

      const result = await response.json();
      Toastify({
        text: "Producto guardado correctamente.",
        duration: 1000,
        position: "center",
        style: {
          background:
            "linear-gradient(to right,rgb(0, 255, 21),rgb(61, 201, 80))",
        },
      }).showToast();
    } catch (error) {
      console.error("Error:", error);
    }
  });

//Logica para buscar todos los  productos y agregarlos a la tabla
document
  .getElementById("buscarProducto")
  .addEventListener("click", async () => {
    const table = document.getElementById("productos-lista");
    const res = await fetch("http://localhost:3000/productos");

    try {
      const res = await fetch("http://localhost:3000/productos");
      const data = await res.json();
      console.log(data);
      table.innerHTML = "";
      data.forEach((x) => {
        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Seleccionar";

        const tdAcciones = document.createElement("td");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        tdNombre.textContent = `${x.pNombre}`;
        tdNombre.value = x.id_producto;
        const tdDescripcion = document.createElement("td");
        tdDescripcion.textContent = `${x.descripcion}`;
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = `${x.precio}`;
        const tdCategoria = document.createElement("td");
        tdCategoria.textContent = `${x.cNombre}`;
        const tdMarca = document.createElement("td");
        tdMarca.textContent = `${x.nombre}`;
        tr.appendChild(tdNombre);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdMarca);

        //Logica para seleccionar el producto a modificar cargando los datos en el formulario
        tdAcciones.appendChild(btnModificar);

        btnModificar.addEventListener("click", async () => {
          document.getElementById("prod_nombre").value = "";
          document.getElementById("prod_descripcion").innerText = "";
          document.getElementById("prod_precio").value = "";

          try {
            const res = await fetch(
              `http://localhost:3000/productos/${tdNombre.value}`
            );
            const data = await res.json();
            console.log(data);
            document.getElementById("prod_nombre").value = data.nombre;
            document.getElementById("prod_nombre").dataset.productoId =
              data.id_producto;
            document.getElementById("prod_descripcion").innerText =
              data.descripcion;
            document.getElementById("prod_precio").value = data.precio;
          } catch (error) {
            console.log(error);
          }
        });
        tdAcciones.appendChild(document.createTextNode("")); // espacio entre botones
        tdAcciones.appendChild(btnEliminar);

        //Logica que permite eliminar el producto

        btnEliminar.addEventListener("click", async () => {
          try {
            Swal.fire({
              title: "Seguro quiere eliminar?",
              text: "No se puede recuperar el producto!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, eliminar!",
            }).then((result) => {
              if (result.isConfirmed) {
                const res = fetch(
                  `http://localhost:3000/productos/${tdNombre.value}`,
                  {
                    method: "DELETE",
                  }
                );
                Swal.fire({
                  title: "Eliminado!",
                  text: "El producto se elimino.",
                  icon: "success",
                });
              }
            });
          } catch (error) {
            console.log(error);
          }
        });
        table.appendChild(tr);
        tr.appendChild(tdAcciones);
      });
    } catch (error) {
      console.log(error);
    }
  });

//Logica para modificar los productos
document
  .getElementById("eliminarProducto")
  .addEventListener("click", async () => {
    const nombre = document.getElementById("prod_nombre").value;
    const descripcion = document.getElementById("prod_descripcion").value;
    const precio = document.getElementById("prod_precio").value;
    const categoria_id = document.getElementById("prod_categoria").value;
    const marca_id = document.getElementById("prod_marca").value;

    const id = document.getElementById("prod_nombre").dataset.productoId;

    product = {
      nombre,
      descripcion,
      precio,
      marca_id,
      categoria_id,
    };

    try {
      const res = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        Toastify({
          text: "Producto modificado correctamente",
          duration: 1000,
          position: "center",
          style: {
            background:
              "linear-gradient(to right,rgb(0, 255, 13),rgb(77, 201, 61))",
          },
        }).showToast();
      }
    } catch (error) {
      console.log(error);
    }
  });

//Encargado de verificar el usuario al ingresar a la pagina
const token = localStorage.getItem("token");
if (!token) {
  Toastify({
    text: "Debes iniciar sesion",
    duration: 1000,
    position: "center",
    style: {
      background: "linear-gradient(to right,rgb(255, 0, 51),rgb(201, 61, 61))",
    },
  }).showToast();
  setTimeout(() => {
    window.location.href = "../Pages/loguin.html";
  }, 1000);
}
const payloadBase64 = token.split(".")[1];
const payloadJson = atob(payloadBase64);
const payload = JSON.parse(payloadJson);

const rol = payload.usuario.rol;
if (rol != 1) {
  Toastify({
    text: "Usuario no autorizado o no inicio sesion",
    duration: 1000,
    position: "center",
    style: {
      background: "linear-gradient(to right,rgb(255, 0, 51),rgb(201, 61, 61))",
    },
  }).showToast();
  setTimeout(() => {
    window.location.href = "../Pages/loguin.html";
  }, 1000);
} else {
  fetch("http://localhost:3000/auth/protegida", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (res) => {
      const text = await res.text();
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
      return JSON.parse(text);
    })
    .then((data) => {
      if (data.usuario.rol === 1) {
        document.querySelector(".ocultar").style.display = "block";
        const email = data.usuario.email || data.usuario;
        document.getElementById("contenido").innerText = `Bienvenido, ${email}`;
      } else {
        throw new Error("Mensaje inesperado en data.mensaje");
      }
    })
    .catch((error) => {
      Toastify({
        text: "Sesion expirada",
        duration: 1000,
        position: "center",
        style: {
          background:
            "linear-gradient(to right,rgb(255, 0, 51),rgb(201, 61, 61))",
        },
      }).showToast();
      localStorage.removeItem("token");
      window.location.href = "../../index.html";
    });
}

document.getElementById("log-out").addEventListener("click", () => {
  Toastify({
    text: "Sesion finalizada",
    duration: 2000,
    position: "center",
    style: {
      background: "linear-gradient(to right,rgb(255, 0, 51),rgb(201, 61, 61))",
    },
  }).showToast();

  setTimeout(() => {
    localStorage.removeItem("token");
    window.location.href = "../../index.html";
    document.querySelector(".ocultar").style.display = "none";
  }, 1000);
});
