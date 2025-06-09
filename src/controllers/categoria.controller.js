const service = require("../services/categorias.service");

exports.getAll = async (req, res) => {
  try {
    const categorias = await service.getAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      error: "No se encontro ninguna categoria",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const categoria = await service.getOne(req.params.id);
    if (!categoria) {
      return res.status(400).json({ error: "Categoria no encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Id no encontrado" });
  }
};

exports.create = async (req, res) => {
  try {
    const cat = await service.create(req.body);
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear" });
  }
};

exports.modificar = async (req, res) => {
  try {
    const categoria = await service.modificarCategoria(req.body, req.params.id);
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const verificar = await service.getOne(req.params.id);
    if (!verificar) {
      res
        .status(404)
        .json({ Error: "La categoria que intenta eliminar no existe" });
      return;
    }
    const remover = await service.removeCategoria(req.params.id);
    res.status(200).json(remover);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
