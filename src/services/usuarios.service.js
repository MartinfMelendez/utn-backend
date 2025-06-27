const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query(
      "Select nombre, apellido, email, coalesce(direccion,'-') as direccion, coalesce (telefono,'-') as telefono from usuario"
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (email) => {
  try {
    const [row] = await pool.query(
      "select id_usuario, nombre, apellido, email, password,coalesce(direccion,'-') as direccion, coalesce (telefono,'-') as telefono from usuario where email = ?",
      [email]
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
    direccion,
    telefono,
  };
};

exports.modificar = async (
  id,
  { nombre, apellido, email, password, direccion, telefono }
) => {
  try {
    await pool.query(
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
