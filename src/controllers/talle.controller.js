const services = require("../services/talle.service");

exports.getAll = async (req, res) => {
  try {
    const resultado = await services.getAll();
    if (resultado.length === 0) {
      res.status(200).json({ Mensaje: "No se cargaron talles" });
      return;
    }
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los talles" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const verificar = await services.getOne(req.params.id);
    if (!verificar) {
      res.status(404).json({ Mensaje: "Talle no encontrado" });
      return;
    }
    res.status(200).json(verificar);
  } catch (error) {
    res.status(500).json({ Error: "Error al obtener talles" });
  }
};

exports.createTalle = async (req, res) => {
  try {
    const talle = await services.create(req.body);
    console.log(talle);
    res.status(201).json(talle);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.modificarTalle = async (req, res) => {
  try {
    const verificar = await services.getOne(req.params.id);
    if (!verificar) {
      res.status(404).json({ Error: "Talle no encontrado" });
      return;
    }
    const talle = await services.modify(req.params.id, req.body);
    res.status(200).json(talle);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const verificar = await services.getOne(req.params.id);
    if (!verificar) {
      res.status(404).json({ Error: "Talle no encontrado" });
      return;
    }
    await services.remove(req.params.id);
    res.status(200).json({ Mensaje: "Talle eliminado" });
  } catch (error) {
    res.status(500).json(error);
  }
};
