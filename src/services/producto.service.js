const pool = require("../database/db");

exports.getAll = async (req, res) => {
  try {
    const [row] = await pool.query("select * from productos");
    return row;
  } catch (error) {
    res.status(500).json({ error: "No encontrado" });
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(
      "select * from productos where id_producto = ?",
      [id]
    );
    return row[0];
  } catch (error) {
    res.status(500).json({ error: "No conectado" });
  }
};

exports.create = async ({
  nombre,
  descripcion,
  precio,
  marca_id,
  categoria_id,
}) => {
  const [result] = await pool.query(
    "insert into productos (nombre,descripcion,precio,marca_id,categoria_id) values (?,?,?,?,?)",
    [nombre, descripcion, precio, marca_id, categoria_id]
  );
  return {
    id: result.insertId,
    nombre,
    descripcion,
    precio,
    marca_id,
    categoria_id,
  };
};
