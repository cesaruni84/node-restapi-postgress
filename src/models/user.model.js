import { pool } from "../config/db.js";

export const getAllUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");
  return rows;
};

export const getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
};


export const getUserByEmail = async (email) =>{
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows;
}