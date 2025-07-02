document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    document.getElementById("log_in").style.display = "none";
    document.getElementById("log_off").style.display = "block";
  }
});

//Iniciar sesion
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    const token = localStorage.getItem("token");

    const payloadBase64 = data.token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const rol = payload.usuario.rol;

    if (rol === 1) {
      localStorage.setItem("token", data.token);
      window.location.href = "/src/Pages/gestorProductos.html";
      return;
    }

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/index.html";
    } else {
      Toastify({
        text: data.mensaje || "Credenciales inválidas",
        duration: 1000,
        position: "center",
        style: {
          background:
            "linear-gradient(to right,rgb(255, 0, 51),rgb(201, 61, 61))",
        },
      }).showToast();
    }
  } catch (error) {
    alert("Error al conectar con el servidor");
  }
});

//Cerrar sesion

document.getElementById("log_off").addEventListener("click", async () => {
  Toastify({
    text: "Sesion finalizada",
    duration: 2000,
    position: "center",
    style: {
      background: "linear-gradient(to right,rgb(255, 0, 51),rgb(201, 61, 61))",
    },
  }).showToast();

  setTimeout(() => {
    document.getElementById("log_in").style.display = "block";
    document.getElementById("log_off").style.display = "none";
    localStorage.removeItem("token");
  }, 2000);
});
