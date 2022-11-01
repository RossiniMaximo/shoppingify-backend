import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
require("dotenv").config();

export function getSHA256ofString(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function createToken(data) {
  return jwt.sign({ data }, process.env.JWT_KEY);
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return { error: error.message };
  }
}
