const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query("select * from talle");
    return row;
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query("select * from talle where id_talle = ?", [
      id,
    ]);
    return row[0];
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.create = async ({ nombre }) => {
  try {
    const [talle] = await pool.query(
      "insert into talle (nombre_talle) values (?)",
      [nombre]
    );
    return { id: talle.insertId, nombre };
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.modify = async (id, { nombre }) => {
  try {
    await pool.query("update talle set nombre_talle = ? where id_talle = ?", [
      nombre,
      id,
    ]);

    return { id, nombre };
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.remove = async (id) => {
  try {
    await pool.query("delete from talle where id_talle = ?", [id]);
    return { delete: true };
  } catch (error) {
    return error.sqlMessage;
  }
};
