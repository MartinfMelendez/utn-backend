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

    if (res.ok) {
      localStorage.setItem("token", data.token);
      console.log(data.token);
      window.location.href = "/src/Pages/gestorUsuarios.html";
    } else {
      alert(data.mensaje || "Credenciales inválidas");
    }
  } catch (error) {
    alert("Error al conectar con el servidor");
  }
});
