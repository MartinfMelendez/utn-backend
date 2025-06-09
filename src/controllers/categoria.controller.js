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
