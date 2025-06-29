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
    const tokena = localStorage.getItem("tokena");
    const token = localStorage.getItem("token");
    console.log(token);
    if (token || tokena) {
      Swal.fire({
        title: "Usuario ya logueado",
        text: "Desea cerrar la sesion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Se, cerrar",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          Swal.fire({
            title: "Sesion finalizada!",
            text: "Su sesion se cerro con exito",
            icon: "success",
          });
        }
      });
      return;
    }
    const payloadBase64 = data.token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const rol = payload.usuario.rol;

    if (rol === 1) {
      localStorage.setItem("tokena", data.token);
      window.location.href = "/src/Pages/gestorUsuarios.html";
      return;
    }

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/src/Pages/gestorUsuarios.html";
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
