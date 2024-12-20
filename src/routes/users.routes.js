import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../controllers/user.controllers.js";
import {
  userBodyValidationSchema,
  idParamValidationSchema,
  validateRequest,
  validateUserEmail,
} from "../middlewares/user.validate.js";

// Inicializamos el router de express
const router = Router();

// Aplicamos el middleware de validación a las rutas que lo necesiten (Global)
// router.use(userValidationSchema, validateRequest);

// Definimos las rutas para users
router.get("/users", getAllUsers);
router.get("/users/search", getUserByEmail);
router.get("/users/:id", idParamValidationSchema, validateRequest, getUserById);
router.post(
  "/users",
  userBodyValidationSchema,
  validateRequest,
  validateUserEmail,
  createUser
);
router.put(
  "/users/:id",
  idParamValidationSchema,
  userBodyValidationSchema,
  validateRequest,
  updateUser
);
router.delete("/users/:id", deleteUser);

// Exportamos el router de users para usarlo en la aplicación
export default router;
