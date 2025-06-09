const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query("Select * from usuario");
    return row;
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(
      "select * from usuario where id_usuario = ?",
      [id]
    );
    return row[0];
  } catch (error) {
    console.log(error);
  }
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

exports.modificar = async (
  id,
  { nombre, apellido, email, password, direccion, telefono }
) => {
  try {
    const [row] = await pool.query(
      "update usuario set nombre = ?, apellido = ? , email = ?, password = ?, direccion = ?, telefono = ? where id_usuario = ?",
      [nombre, apellido, email, password, direccion, telefono, id]
    );
    return { nombre, apellido, email, password, direccion, telefono, id };
  } catch (error) {
    console.log(error);
  }
};

exports.remove = async (id) => {
  try {
    await pool.query("delete from usuario where id_usuario = ?", [id]);
    return { delete: true };
  } catch (error) {
    console.log(error);
  }
};
