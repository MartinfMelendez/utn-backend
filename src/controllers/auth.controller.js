//Importa jwt para utilizar
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../services/usuarios.service");

exports.loguin = async (req, res) => {
  const { email, password } = req.body;

  const user = await users.getOne(email);
  if (!user)
    return res.status(401).json({
      mensaje: "Email y/o contraseña incorrecta. Verifique por favor",
    });
  const passwordValida = await bcrypt.compare(password.trim(), user.password);
  if (!passwordValida)
    return res.status(401).json({
      mensaje: "Email y/o contraseña incorrecta",
      usuario: user.email,
    });

  const token = jwt.sign(
    { usuario: { email: email, rol: user.rol } },
    process.env.SECRET_KEY,
    {
      expiresIn: "5m",
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
    if (decoded.usuario.rol === 1) {
      res.status(200).json({
        mensaje: "Acceso concedido",
        usuario: decoded.usuario || decoded,
      });
    } else {
      res.status(401).json({ mensaje: "Usuario no autorizado" });
      return;
    }
  });
};
