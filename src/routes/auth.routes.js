import { Router } from "express";
import { loginValidate } from '../controllers/auth.controller.js';

// Inicializamos el router de express
const router = Router();

// Definimos las rutas para users
router.post("/auth/login", loginValidate);
//router.get("/auth/validate", getUserByEmail);

// Exportamos el router de users para usarlo en la aplicación
export default router;
