const service = require("../services/carrito.service");

exports.getAll = async (req, res) => {
  try {
    const carritos = await service.getAll();
    if (carritos.length === 0) {
      res.status(200).json({ Mensaje: "Sin carritos" });
      return;
    }
    console.log(carritos);
    res.json(200).json(carritos);
  } catch (error) {
    res.status(500).json({ Error: "No se pudo obtener los carritos" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id_carrito, id_usuario } = req.params;
    const carrito = await service.getOne(id_carrito, id_usuario);
    if (!carrito) {
      return res.status(404).json({ mensaje: "El carrito buscado no existe" });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el carrito" });
  }
};

exports.create = async (req, res) => {
  try {
    const carrito = await service.create(req.body);
    res.status(201).json(carrito);
  } catch (error) {
    res.status(500).json({ errror: "Error al crear el carrito" });
  }
};

exports.delete = async (req, res) => {
  try {
    const resu = await service.remove(req.params.id);
    res.status(200).json(resu);
  } catch (error) {
    res.status(500).json({ Mensaje: error.mensaje });
  }
};
