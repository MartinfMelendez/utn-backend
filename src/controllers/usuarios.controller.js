const service = require("../services/usuarios.service");

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
    const result = await service.getOne(req.params.id);
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
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el usuario" });
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
