let token = "";

async function login() {
  const res = await fetch("http://localhost:3000/auth/loguin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById("tokenBox").textContent = token;
    document.getElementById("respuesta").textContent = "¡Login exitoso!";
  } else {
    document.getElementById("respuesta").textContent = "Error: " + data.mensaje;
  }
}

async function acceder() {
  if (!token) {
    alert("Primero debes iniciar sesión");
    return;
  }

  const res = await fetch("http://localhost:3000/auth/protegida", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await res.json();
  document.getElementById("respuesta").textContent = JSON.stringify(
    data,
    null,
    2
  );
}
