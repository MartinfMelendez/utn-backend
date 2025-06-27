const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query("select * from carrito_producto");
    return row;
  } catch (error) {
    console.log(error.sqlMessage);
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(
      "select * from carrito_producto where id_carrito = ?",
      [id]
    );
    return row[0];
  } catch (error) {
    console.log(error.sqlMessage);
  }
};

exports.create = async ({ id_carrito, id_producto, id_talle, cantidad }) => {
  try {
    if (!id_carrito || !id_producto || !id_talle || !cantidad) {
      console.log("Faltan completar campos");
      return;
    }
    await pool.query(
      "INSERT INTO carrito_producto(id_carrito, id_producto, id_talle, cantidad) VALUES (?,?,?,?)",
      [id_carrito, id_producto, id_talle, cantidad]
    );
  } catch (error) {
    console.log(error.sqlMessage);
  }
};

exports.modify = async () => {
  try {
  } catch (error) {
    console.log(error.sqlMessage);
  }
};

exports.delete = async (id) => {
  try {
    await pool.query("delete from carrito_producto where id_carrito = ?", [id]);
    return { delete: true };
  } catch (error) {
    console.log(error.sqlMessage);
  }
};
