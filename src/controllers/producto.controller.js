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

exports.modificarProducto = async (req, res) => {
  try {
    const verificar = await service.getOne(req.params.id);
    if (!verificar) {
      res
        .status(404)
        .json({ Error: "El Producto que intenta modificar no existe" });
      return;
    }
    const update = await service.modificar(req.body, req.params.id);
    res.status(200).json(update);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al modificar el producto" });
  }
};

exports.removeProducto = async (req, res) => {
  try {
    const verificar = await service.getOne(req.params.id);
    if (!verificar) {
      res.status(404).json({ Error: error });
      return;
    }
    const remover = await service.remove(req.params.id);
    res.status(200).json(remover);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
