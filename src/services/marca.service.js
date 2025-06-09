const pool = require("../database/db");

exports.getAll = async () => {
  const [row] = await pool.query("Select * from marca");
  return row;
};

exports.getOne = async (id) => {
  const [row] = await pool.query("select * from marca where id_marca = ?", [
    id,
  ]);
  return row[0];
};

exports.creat = async ({ nombre }) => {
  const [result] = await pool.query("insert into marca (nombre) values (?)", [
    nombre,
  ]);
  return { id: result.insertId, nombre };
};

exports.modificar = async ({ nombre }, id) => {
  const [result] = await pool.query(
    "update marca set nombre = ? where id_marca = ?",
    [nombre, id]
  );
  return { id, nombre };
};

exports.remove = async (id) => {
  await pool.query("delete from marca where id_marca = ?", [id]);
  return { delete: true };
};
