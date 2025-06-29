//Permite crear a los usuarios
document.getElementById("usuarioForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    email: form.email.value,
    password: form.password.value,
    direccion: form.direccion.value,
    telefono: form.telefono.value,
  };

  if (
    !form.nombre.value ||
    !form.apellido.value ||
    !form.email.value ||
    !form.password.value ||
    !form.direccion.value ||
    !form.telefono.value
  ) {
    alert("Todos los campos son obligatorios. Verifique por favor!");
    return;
  }

  const res = await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    alert("Persona creada correctamente");
    form.removeEventListener();
  } else {
    alert("Error al guardar");
  }
});

//Permite buscar a los usuarios
document.getElementById("Buscar").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  try {
    const res = await fetch(
      `http://localhost:3000/usuarios/email?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error("Error al buscar el usuario.");
    }

    const datos = await res.json();

    if (!datos.error) {
      document.getElementById("nombre").value = datos.nombre;
      document.getElementById("apellido").value = datos.apellido;
      document.getElementById("direccion").value = datos.direccion;
      document.getElementById("telefono").value = datos.telefono;
    } else {
      alert("Usuario no encontrado");
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error de conexión al servidor.");
  }
});

//Permite eliminar a los usuarios
document.getElementById("Eliminar").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const res = await fetch(`http://localhost:3000/usuarios`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Usuario eliminado correctamente");
      document.getElementById("usuarioForm").reset();
    } else {
      alert(data.error || "No se pudo eliminar");
    }
  } catch (error) {
    alert("Error de conexión");
  }
});

const token = localStorage.getItem("tokena");

if (!token) {
  Toastify({
    text: "Usuario no autorizado",
    duration: 2000,
    position: "center",
    style: {
      background: "linear-gradient(to right,rgb(255, 0, 51),rgb(201, 61, 61))",
    },
  }).showToast();
  setTimeout(() => {
    window.location.href = "../Pages/loguin.html";
  }, 2000);
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
      console.log(data.usuario.rol);
      if (data.usuario.rol === 1) {
        document.querySelector(".ocultar").style.display = "block";
        const email = data.usuario.email || data.usuario;
        document.getElementById("contenido").innerText = `Bienvenido, ${email}`;
      } else {
        throw new Error("Mensaje inesperado en data.mensaje");
      }
    })
    .catch((error) => {
      alert("Sesión inválida o expirada. Inicia sesión nuevamente.");
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
