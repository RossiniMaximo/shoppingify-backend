"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = exports.getSHA256ofString = void 0;
var crypto = __importStar(require("crypto"));
var jwt = __importStar(require("jsonwebtoken"));
require("dotenv").config();
function getSHA256ofString(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}
exports.getSHA256ofString = getSHA256ofString;
function createToken(data) {
    return jwt.sign({ data: data }, process.env.JWT_KEY);
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
