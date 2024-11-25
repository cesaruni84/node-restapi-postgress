import { getUserByEmail } from "../models/user.model.js";
import { handleError } from "../utils/error.utils.js";
import { HttpCodes } from "../utils/httpCodes.js";
import { Constants } from "../utils/constants.js";
import { getSecretKeyPlain } from "../utils/awsSecrets.js";
import jwt from "jsonwebtoken";
import tokenResponse from "../models/tokenResponse.js";

export const loginValidate = async (request, response) => {
  const secretKeyValue = await getSecretKeyPlain(Constants.jwt_secret_name);
  const { email, password } = request.body;

  try {
    const user = await getUserByEmail(email);
    if (user.length === 0 || user[0].password !== password) {
      return response
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const jwtToken = jwt.sign({ user: user.email }, secretKeyValue, {
      expiresIn: Constants.expire_in,
    });
    const loginResponse = new tokenResponse(jwtToken, Constants.typeToken, Constants.expire_in);
    return response.status(HttpCodes.OK).json(loginResponse);
  } catch (error) {
    handleError("Error logging in ", error, response);
  }
};
