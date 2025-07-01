const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query("select * from carrito");
    return row;
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.getOne = async (idCarrito, idUsuario) => {
  try {
    const [row] = await pool.query(
      "Select * from carrito where id_carrito = ? and id_usuario = ? ",
      [idCarrito, idUsuario]
    );
    return row[0];
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.create = async ({ id_carrito, id_usuario, fehca_creacion }) => {
  try {
    await pool.query(
      "INSERT INTO carrito(id_carrito, id_usuario, fecha_creacion) VALUES (?,?,?)",
      [id_carrito, id_usuario, fehca_creacion]
    );
    return { id_usuario };
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.remove = async (id_carrito) => {
  try {
    await pool.query("delete from carrito where id_carrito = ?", [id_carrito]);
    return { delete: true };
  } catch (error) {
    return error.sqlMessage;
  }
};
