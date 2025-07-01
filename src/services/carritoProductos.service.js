const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query(
      "select p.nombre, p.precio, cp.cantidad from carrito_producto cp inner join productos p on cp.id_producto = p.id_producto"
    );
    return row;
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(
      "select p.nombre, p.precio, cp.cantidad from carrito_producto cp inner join productos p on cp.id_producto = p.id_producto where cp.id_carrito = ?",
      [id]
    );
    return row[0];
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.create = async ({ id_carrito, id_producto, precio, cantidad }) => {
  try {
    console.log(!id_carrito || !id_producto || !precio || !cantidad);
    if (!id_carrito || !id_producto || !precio || !cantidad) {
      console.log("Faltan completar campos");
      return;
    }
    await pool.query(
      "INSERT INTO carrito_producto(id_carrito, id_producto, precio, cantidad) VALUES (?,?,?,?)",
      [id_carrito, id_producto, precio, cantidad]
    );
  } catch (error) {
    console.log(error.sqlMessage);
  }
};

exports.modify = async () => {
  try {
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.delete = async (id) => {
  try {
    await pool.query("delete from carrito_producto where id_carrito = ?", [id]);
    return { delete: true };
  } catch (error) {
    return error.sqlMessage;
  }
};
