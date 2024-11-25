import jwt from "jsonwebtoken";
import { HttpCodes } from "../utils/httpCodes.js";

// Validate token JWT
export const authenticateJWT = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return response
          .status(HttpCodes.FORBIDDEN)
          .json({ message: error.message, type: error.name });
      }
      next(); // Next middleware
    });
  } else {
    response.status(HttpCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};
