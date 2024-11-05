import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'debug', // Cambia el nivel a 'debug' para registrar todos los niveles
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message, ...meta }) => {
        return JSON.stringify({
          timestamp,
          level,
          message,
          ...meta
        }, null, 2); // Formato JSON con saltos de línea
      })
    ),
    transports: [
      //new transports.File({ filename: 'combined.log' }), // Archivo para todos los niveles
      new transports.File({ filename: 'error.log', level: 'error' }), // Archivo específico para errores
      new transports.Console()
    ],
  });

// const logger = createLogger({
//   level: 'error',
//   format: format.combine(
//     format.timestamp(),
//     format.json()
//   ),
//   transports: [
//     new transports.File({ filename: 'error.log', level: 'error' }),
//     new transports.Console()
//   ],
// });

// export default logger;