"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = exports.getSHA256ofString = void 0;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
function getSHA256ofString(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}
exports.getSHA256ofString = getSHA256ofString;
function createToken(data) {
    return jwt.sign({ data }, process.env.JWT_KEY);
}
exports.createToken = createToken;
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_KEY);
    }
    catch (error) {
        return { error: error.message };
    }
}
exports.verifyToken = verifyToken;
