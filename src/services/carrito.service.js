const pool = require("../database/db");

exports.getAll = async () => {
  try {
    const [row] = await pool.query("select * from carrito");
    return row;
  } catch (error) {
    console.log(error);
  }
};
