const service = require("../services/usuarios.service");

const bcrypt = require("bcrypt");

exports.getAll = async (req, res) => {
  try {
    const result = await service.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los usuarios" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { email } = req.query;
    const result = await service.getOne(email);

    if (!result) {
      res.status(404).json({ error: "No se encontro el usuario buscado" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el usuario" });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, direccion, telefono, rol } =
      req.body;
    const passCrypt = await bcrypt.hash(password, 8);

    const result = await service.create({
      nombre,
      apellido,
      email,
      password: passCrypt,
      direccion,
      telefono,
      rol: rol || 0,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

exports.modificarUsuario = async (req, res) => {
  try {
    const verificar = await service.getOne(req.params.id);
    if (!verificar) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    const result = await service.modificar(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "No se pudo modificar el usuario" });
  }
};

exports.remove = async (req, res) => {
  try {
    const verificar = await service.getOne(req.params.id);
    if (!verificar) {
      res
        .status(404)
        .json({ error: "El usuario que intenta eliminar no existe" });
      return;
    }
    const remove = await service.remove(req.params.id);
    res.status(200).json(remove);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

exports.removeSeguro = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son requeridos" });
    }
    const usuario = await service.getOne(email);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const comparar = await bcrypt.compare(password, usuario.password);
    if (!comparar) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    await service.remove(usuario.id_usuario);
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
