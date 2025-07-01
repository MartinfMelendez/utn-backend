const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query(
      "Select nombre, apellido, email, coalesce(direccion,'-') as direccion, coalesce (telefono,'-') as telefono from usuario"
    );
    return row;
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.getOne = async (email) => {
  try {
    const [row] = await pool.query(
      "select id_usuario, nombre, apellido, email, password,coalesce(direccion,'-') as direccion, coalesce (telefono,'-') as telefono, rol from usuario where email = ?",
      [email]
    );
    return row[0];
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.create = async ({
  nombre,
  apellido,
  email,
  password,
  direccion,
  telefono,
  rol,
}) => {
  const row = await pool.query(
    "Insert Into usuario (nombre,apellido,email,password,direccion,telefono,rol) values (?,?,?,?,?,?,?)",
    [nombre, apellido, email, password, direccion, telefono, rol]
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
      "update usuario set nombre = ?, apellido = ? , email = ?, password = ?, direccion = ?, telefono = ?, rol = ? where id_usuario = ?",
      [nombre, apellido, email, password, direccion, telefono, rol, id]
    );
    return { nombre, apellido, email, password, direccion, telefono, rol, id };
  } catch (error) {
    return error.sqlMessage;
  }
};

exports.remove = async (id) => {
  try {
    await pool.query("delete from usuario where id_usuario = ?", [id]);
    return { delete: true };
  } catch (error) {
    return error.sqlMessage;
  }
};
