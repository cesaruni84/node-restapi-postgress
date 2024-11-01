import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

// Inicializamos el router de express
const router = Router();

// Definimos las rutas para users
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Exportamos el router de users para usarlo en la aplicación
export default router;