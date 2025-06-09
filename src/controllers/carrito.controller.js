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
