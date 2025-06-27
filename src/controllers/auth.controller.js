//Importa jwt para utilizar
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../services/usuarios.service");

exports.loguin = async (req, res) => {
  const { email, password } = req.body;

  const user = await users.getOne(email);
  if (!user) return res.status(401).json({ mensaje: "Usuario no encontrado" });
  const passwordValida = await bcrypt.compare(password.trim(), user.password);
  if (!passwordValida)
    return res.status(401).json({ mensaje: "Contraseña incorrecta" });

  const token = jwt.sign(
    { usuario: { email: email } },
    process.env.SECRET_KEY,
    {
      expiresIn: "10m",
    }
  );
  res.json({ token });
};

exports.protegida = (req, res) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.status(401).json({ mensaje: "Falta el token" });
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ mensaje: "Token inválido" });
    // ✅ respuesta clara y estructurada
    res.status(200).json({
      mensaje: "Acceso concedido",
      usuario: decoded.usuario || decoded,
    });
  });
};
