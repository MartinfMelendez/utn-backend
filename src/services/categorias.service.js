const nodemon = require("nodemon");
const pool = require("../database/db"); //me conecto a la base de datos

//Realizo la consulta sql a la base de datos
exports.getAll = async () => {
  const [row] = await pool.query("Select * from categoria");
  return row;
};

exports.getOne = async (id) => {
  const [row] = await pool.query(
    "Select * from categoria where id_categoria = ? ",
    [id]
  );
  return row[0];
};

exports.create = async ({ nombre }) => {
  const result = await pool.query("insert into categoria (nombre) values (?)", [
    nombre,
  ]);
  return { id: result.insertId, nombre };
};
