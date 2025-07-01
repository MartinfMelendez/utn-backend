const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query("Select * from marca");
    return row;
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query("select * from marca where id_marca = ?", [
      id,
    ]);
    return row[0];
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.creat = async ({ nombre }) => {
  try {
    const [result] = await pool.query("insert into marca (nombre) values (?)", [
      nombre,
    ]);
    return { id: result.insertId, nombre };
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.modificar = async ({ nombre }, id) => {
  try {
    const [result] = await pool.query(
      "update marca set nombre = ? where id_marca = ?",
      [nombre, id]
    );
    return { id, nombre };
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.remove = async (id) => {
  try {
    await pool.query("delete from marca where id_marca = ?", [id]);
    return { delete: true };
  } catch (error) {
    return error.sqlMessage;
  }
};
