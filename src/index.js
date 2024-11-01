import { PORT } from './config/config.js';
import app from './app.js';

// Iniciamos el servidor por el puerto especificado
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});