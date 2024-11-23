import {
  getAllUsers as getAllUsersModel,
  getUserById as getUserByIdModel,
  getUserByEmail as getUserByEmailModel,
  createUser as createUserModel,
} from "../models/user.model.js";
import { pool } from "../config/db.js";
import { handleError } from "../utils/error.utils.js";
import { HttpCodes } from "../utils/httpCodes.js";

export const getAllUsers = async (request, response) => {
  try {
    // const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");
    const users = await getAllUsersModel();
    if (users.length === 0) {
      return response.status(HttpCodes.NO_CONTENT).json();
    }
    response.status(HttpCodes.OK).json(users);
  } catch (error) {
    // logger.error(`Error getting all users: ${error.message}`, error);
    // return response.status(500).json({ message: "Error getting all users" });
    if (error.code === 'ETIMEDOUT') {
      handleError("Tiempo de conexión a la base de datos agotado", error, response);
    } else {
      handleError("Error getting all users ", error, response);
    }
  }
};

export const getUserById = async (request, response) => {
  const { id } = request.params;
  // es más óptima en términos de legibilidad y mantenimiento del código.
  try {
    const user = await getUserByIdModel(id);
    if (user.length === 0) {
      return response
        .status(HttpCodes.NO_CONTENT)
        .json({ message: "User not found" });
    }
    return response.json(user);
  } catch (error) {
    handleError("Error getting user ", error, response);
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


export const getUserByEmail = async (request, response) => {
  const email = request.query.email;
  try {
    const user = await getUserByEmailModel(email);
    if (user.length === 0) {
      return response
        .status(HttpCodes.NO_CONTENT)
        .json({ message: "User with email: " + email + " not found" });
    }
    return response.status(HttpCodes.OK).json(user);
  } catch (error) {
    handleError("Error getting user with email " + email, error, response);
  }
};

export const createUser = async (request, response) => {
  const emailCreateUser = request.body.email;
  const client = await pool.connect();
  try {
    const userExist = await getUserByEmailModel(emailCreateUser);
    if (userExist.length > 0) {
      return response
        .status(HttpCodes.CONFLICT)
        .json({
          message: "User with email " + emailCreateUser + " already exists",
        });
    }
    await client.query("BEGIN"); // Iniciamos una transacción
    const { name, email, password, age, address, phone_number } = request.body;
    const user = await createUserModel(
      name,
      email,
      password,
      age,
      address,
      phone_number
    );
    client.query("COMMIT"); // Confirmamos la transacción
    return response.status(HttpCodes.CREATED).json(user);
  } catch (error) {
    await client.query("ROLLBACK"); // Cancelamos la transacción
    handleError("Error creating user ", error, response);
  } finally {
    client.release(); // Liberamos la conexion del cliente hacia la base de datos
  }
};

export const updateUser = async (request, response) => {
  const { id } = request.params;
  const client = await pool.connect();
  try {
    const { name, email, password, age, address, phone_number } = request.body;
    const userExist = await getUserByEmailModel(email);
    if (userExist.length > 0 && userExist[0].id !== id) {
      return response
      .status(HttpCodes.CONFLICT)
      .json({
        message: "User with email " + email + " already exists",
      });
    }
    await client.query("BEGIN");
    const { rows } = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3, " +
        "age = $4, address = $5, phone_number = $6 WHERE id=$7 RETURNING *",
      [name, email, password, age, address, phone_number, id]
    );
    if (rows.length === 0) {
      return response
        .status(HttpCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    await client.query("COMMIT");
    return response.json(rows);
  } catch (error) {
    await client.query("ROLLBACK");
    handleError("Error updating user ", error, response);
  } finally {
    client.release(); // Libera conexion
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
        .status(HttpCodes.NOT_FOUND)
        .json({ message: "User " + id + " not found" });
    }
    return response
      .status(HttpCodes.OK)
      .json({ message: "User " + id + " deleted successfully" });
    //response.sendStatus(200);
  } catch (error) {
    handleError("Error deleting user ", error, response);
  }
};
