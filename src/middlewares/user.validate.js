import { validationResult, checkSchema } from "express-validator";
import { getUserByEmail } from "../models/user.model.js";
import { HttpCodes } from "../utils/httpCodes.js";

export const userBodyValidationSchema = checkSchema({
  name: {
    in: ["body"],
    isString: true,
    trim: true,
    notEmpty: {
      errorMessage: "Name is required",
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Name should be at least 2 characters long",
    },
    custom: {
      options: (value) => value.length <= 50,
      errorMessage: "Name should not be more than 50 characters long",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid email format",
    },
    normalizeEmail: true,
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
});

export const idParamValidationSchema = checkSchema({
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "ID must be an integer",
    },
    toInt: true,
    notEmpty: {
      errorMessage: "ID is required",
    },
  },
});

// Middleware para validar los datos de entrada
export const validateRequest = (request, response, next) => {
  const error = validationResult(request);
  if (!error.isEmpty()) {
    const formattedErrors = error.array().map(error => ({
      field: error.param,
      message: error.msg,
      value: error.value,
      location: error.location
    }
  ));
    return response.status(HttpCodes.NOT_FOUND).json({ errors: formattedErrors });
  }
  next(); // Si no hay errores, continuamos con el siguiente middleware
};


export const validateUserEmail = async (request, response, next) => {
  const userExist = await getUserByEmail(request.body.email);
  if (userExist.length > 0) {
    return response
      .status(HttpCodes.CONFLICT)
      .json({
        message: "User with email " + request.body.email + " already exists",
      });
  }
  next(); // Si no hay errores, continuamos con el siguiente middleware
};

