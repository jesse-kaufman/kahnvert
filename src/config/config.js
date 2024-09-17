/* eslint-disable no-magic-numbers */
import dotenv from "dotenv";

// Environment variables
dotenv.config();

const config = {
  apiPort: process.env?.PORT || 8999,
};

export const httpCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export default config;
