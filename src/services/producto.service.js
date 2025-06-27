const pool = require("../database/db");

exports.getAll = async (req, res) => {
  try {
    const [row] = await pool.query(
      "select id_producto, p.nombre, p.descripcion, p.precio, m.nombre, c.nombre from productos p inner join marca m on m.id_marca = p.marca_id inner join categoria c on c.id_categoria = p.categoria_id"
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(
      "select p.nombre, p.descripcion, p.precio, m.nombre, c.nombre from productos p inner join marca m on m.id_marca = p.marca_id inner join categoria c on c.id_categoria = p.categoria_id where id_producto = ?",
      [id]
    );
    return row[0];
  } catch (error) {
    console.log(error);
  }
};

exports.create = async ({
  nombre,
  descripcion,
  precio,
  marca_id,
  categoria_id,
}) => {
  try {
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
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

exports.remove = async (id) => {
  try {
    await pool.query("delete from productos where id_producto = ?", [id]);
    return { delete: true };
  } catch (error) {
    console.log(error);
  }
};
