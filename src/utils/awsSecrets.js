import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { handleError } from "./error.utils.js";

const client = new SecretsManagerClient({
  region: "us-east-1", // Reemplaza con tu región
});

let cachedSecret = null; // Variable para almacenar el secreto en memoria

export const getSecretKeyPlain = async (secretName) => {
  if (cachedSecret) {
    return cachedSecret;
  }
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      })
    );
    console.log("Retrieved secret from AWS Secrets Manager ...");

    if (response.SecretString) {
      cachedSecret = response.SecretString;
      return cachedSecret;
    }
  } catch (error) {
    handleError("Error retrieving secret from AWS Secrets Manager", error);
    throw error;
  }
};
