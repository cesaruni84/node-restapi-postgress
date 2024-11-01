import express from 'express'; // IMPORTANTE: No olvides instalar express con npm i express
import userRoutes from './routes/users.routes.js';
import morgan from 'morgan';

//Configura la instancia de Express con middlewares, rutas y otros ajustes
 // Inicializamos express
const app = express(); 

// Middlewares para procesar JSON y datos de formularios
app.use(morgan('dev')); // Muestra las peticiones HTTP en consola
app.use(express.json()); // Procesa cuerpos en JSON
app.use(express.urlencoded({ extended: true })); // Procesa datos de formularios

// Rutas de la aplicación: users
app.use(userRoutes); 

export default app;