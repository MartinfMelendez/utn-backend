const pool = require("../database/db");

exports.getAll = async () => {
  const [row] = await pool.query("Select * from usuario");
  return row;
};

exports.getOne = async (id) => {
  const [row] = await pool.query("select * from usuario where id_usuario = ?", [
    id,
  ]);
  return row[0];
};

exports.create = async ({
  nombre,
  apellido,
  email,
  password,
  direccion,
  telefono,
}) => {
  const row = await pool.query(
    "Insert Into usuario (nombre,apellido,email,password,direccion,telefono) values (?,?,?,?,?,?)",
    [nombre, apellido, email, password, direccion, telefono]
  );
  return {
    id: row.insertId,
    nombre,
    apellido,
    email,
    password,
    direccion,
    telefono,
  };
};

exports.remove = async (id) => {
  try {
    await pool.query("delete from usuario where id_usuario = ?", [id]);
    return { delete: true };
  } catch (error) {
    console.log(error);
  }
};
