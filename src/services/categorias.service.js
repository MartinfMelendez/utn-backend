const nodemon = require("nodemon");
const pool = require("../database/db"); //me conecto a la base de datos

//Realizo la consulta sql a la base de datos
exports.getAll = async () => {
  try {
    const [row] = await pool.query("Select * from categoria");
    return row;
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(
      "Select * from categoria where id_categoria = ? ",
      [id]
    );
    return row[0];
  } catch (error) {
    console.log(error);
  }
};

exports.create = async ({ nombre }) => {
  try {
    const result = await pool.query(
      "insert into categoria (nombre) values (?)",
      [nombre]
    );
    return { id: result.insertId, nombre };
  } catch (error) {
    console.log(error);
  }
};

exports.modificarCategoria = async ({ nombre }, id) => {
  try {
    const [newCategoria] = await pool.query(
      "update categoria set nombre = ? where id_categoria = ?",
      [nombre, id]
    );
    return { id, nombre };
  } catch (error) {
    console.log(error);
  }
};

exports.removeCategoria = async (id) => {
  try {
    await pool.query("delete from categoria where id_categoria = ?", [id]);
    return { delete: true };
  } catch (error) {
    console.log(error);
  }
};
