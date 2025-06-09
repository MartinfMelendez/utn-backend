const service = require("../services/marca.service");

exports.getAll = async (req, res) => {
  try {
    const marca = await service.getAll();
    res.json(marca);
    console.log(marca);
  } catch (error) {
    res.status(500).json({ error: "No se encontro nada" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const marca = await service.getOne(req.params.id);
    console.log(req.params.id);
    if (!marca) {
      return res.status(400).json({ error: "La marca buscada no existe" });
    }
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: "Desconocido" });
  }
};

exports.createMarca = async (req, res) => {
  try {
    const newMarca = await service.creat(req.body);
    res.status(201).json(newMarca);
  } catch (error) {
    res.status(401).json({ error: "Error al crear la marca" });
  }
};

exports.modificarMarca = async (req, res) => {
  try {
    const verificar = await service.getOne(req.params.id);
    if (!verificar) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }
    const update = await service.modificar(req.body, req.params.id);
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: "No se puedo actualizar" });
  }
};

exports.removeMacar = async (req, res) => {
  try {
    const verificar = await service.getOne(req.params.id);
    if (!verificar) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }
    const remove = await service.remove(req.params.id);
    res.json(remove);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la marca" });
  }
};
