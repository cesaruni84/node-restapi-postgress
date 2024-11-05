import { logger } from "../utils/logger.js";
import { HttpCodes } from "../utils/httpCodes.js";

export const handleError = (message, error, response) => {
  logger.error(`${error.message}`, error);
  return response
    .status(HttpCodes.INTERNAL_SERVER_ERROR)
    .json({ message: message });
};
