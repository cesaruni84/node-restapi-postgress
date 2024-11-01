import pg from "pg";
import { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js";

// Create a new pool here using the connection string above
export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE, 
  port: DB_PORT,
});
