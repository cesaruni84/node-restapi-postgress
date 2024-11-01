import { pool } from "../config/db.js";
import logger from "../utils/logger.js";

export const getAllUsers = async (request, response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");
    if (rows.length === 0) {
      return response.status(204).json();
    }
    response.status(200).json(rows);
  } catch (error) {
    logger.error(`Error getting all users: ${error.message}`, error);
    return response.status(500).json({ message: "Error getting all users" });
  }
};

export const getUserById = async (request, response) => {
  const { id } = request.params;
  // es más óptima en términos de legibilidad y mantenimiento del código.
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return response
        .status(404)
        .json({ message: "User " + id + " not found" });
    }
    return response.json(rows);
  } catch (error) {
    logger.error(`Error getting user ${id}: ${error.message}`, error);
    return response.status(500).json({ message: "Error getting user " + id });
  }
  // await pool.query('SELECT * FROM users WHERE id = $1', [id])
  // .then(result => {
  //     if(result.rows.length === 0){
  //         response.status(404).json({message: 'User '+ id + ' not found'});
  //         return;
  //     }
  //     response.json(result.rows);
  // })
  // .catch(error => {
  //     response.status(500).json({message: 'Error getting user '+ id});
  // });
};

export const createUser = async (request, response) => {
  const client = await pool.connect(); // Conectamos a la base de datos

  try {
    await client.query("BEGIN"); // Iniciamos una transacción
    const { name, email } = request.body;
    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    client.query("COMMIT"); // Confirmamos la transacción
    return response.status(201).json(rows);
  } catch (error) {
    await client.query("ROLLBACK"); // Cancelamos la transacción
    logger.error(`Error creating user: ${error.message}`, error);
    return response.status(500).json({ message: "Error creating user" });
  } finally {
    client.release(); // Liberamos la conexion del cliente hacia la base de datos
  }
};

export const updateUser = async (request, response) => {
  const { id } = request.params;
  try {
    const { name, email } = request.body;
    const { rows } = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id=$3 RETURNING *",
      [name, email, id]
    );
    if (rows.length === 0) {
      return response
        .status(404)
        .json({ message: "User " + id + " not found" });
    }
    return response.json(rows);
  } catch (error) {
    logger.error(`Error updating user ${id}: ${error.message}`, error);
    return response.status(500).json({ message: "Error updating user " + id });
  }
};

export const deleteUser = async (request, response) => {
  const { id } = request.params;
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (rowCount === 0) {
      return response
        .status(404)
        .json({ message: "User " + id + " not found" });
    }
    return response
      .status(200)
      .json({ message: "User " + id + " deleted successfully" });
    //response.sendStatus(200);
  } catch (error) {
    logger.error(`Error deleting user ${id}: ${error.message}`, error);
    return response.status(500).json({ message: "Error deleting user " + id });
  }
};
