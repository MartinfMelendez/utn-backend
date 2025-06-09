const service = require("../services/producto.service");

exports.getAll = async (req, res) => {
  try {
    const producto = await service.getAll();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Sin productos" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const producto = await service.getOne(req.params.id);
    if (!producto) {
      return res.status(400).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error base de datos" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProducto = await service.create(req.body);
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear un producto" });
  }
};
