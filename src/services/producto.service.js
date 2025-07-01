const pool = require("../database/db");

exports.getAll = async (req, res) => {
  try {
    const [row] = await pool.query(
      "select id_producto, p.nombre as pNombre, p.descripcion, p.precio, m.nombre, c.nombre as cNombre, imagen_url from productos p inner join marca m on m.id_marca = p.marca_id inner join categoria c on c.id_categoria = p.categoria_id"
    );
    return row;
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(
      "select p.id_producto, p.nombre, p.descripcion, p.precio, m.nombre as marca, c.nombre as categoria, imagen_url from productos p inner join marca m on m.id_marca = p.marca_id inner join categoria c on c.id_categoria = p.categoria_id where id_producto = ?",
      [id]
    );
    return row[0];
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.create = async ({
  nombre,
  descripcion,
  precio,
  marca_id,
  categoria_id,
  imagen_url,
}) => {
  try {
    const [result] = await pool.query(
      "insert into productos (nombre,descripcion,precio,marca_id,categoria_id,imagen_url) values (?,?,?,?,?,?)",
      [nombre, descripcion, precio, marca_id, categoria_id, imagen_url]
    );
    return {
      id: result.insertId,
      nombre,
      descripcion,
      precio,
      marca_id,
      categoria_id,
    };
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.modificar = async (
  { nombre, descripcion, precio, marca_id, categoria_id },
  id
) => {
  try {
    const [row] = await pool.query(
      "update productos set nombre = ? , descripcion = ? , precio = ? , marca_id = ? , categoria_id = ? where id_producto = ?",
      [nombre, descripcion, precio, marca_id, categoria_id, id]
    );
    return { nombre, descripcion, precio, marca_id, categoria_id, id };
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.remove = async (id) => {
  try {
    await pool.query("delete from productos where id_producto = ?", [id]);
    return { delete: true };
  } catch (error) {
    return error.sqlMessage;
  }
};
