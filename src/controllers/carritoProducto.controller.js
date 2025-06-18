const service = require("../services/carritoProductos.service");

exports.getAll = async (req, res) => {
  try {
    const result = await service.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const buscado = await service.getOne(req.params.id);
    if (!buscado) {
      res.status(404).json({ Mensaje: "No hay carritos" });
    }
    res.status(200).json(buscado);
  } catch (error) {
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const verificar = await service.getOne(req.params.id);
    if (!verificar) {
      res.status(404).json({ Mensaje: "El carrito no existe" });
      return;
    }
    await service.delete(req.params.id);
    res.status(200).json({ Mensaje: "Se elimino de manera correcta" });
  } catch (error) {
    console.log(error);
  }
};
