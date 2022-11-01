"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.findOrCreateAuth = void 0;
const lib_1 = require("../../lib");
const Auth_1 = require("../../models/Auth");
const findOrCreateAuth = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userId } = data;
    try {
        const hashedPass = (0, lib_1.getSHA256ofString)(password);
        const auth = yield Auth_1.Auth.create({
            email,
            password: hashedPass,
            userId,
        });
        return { auth, authId: auth.get("id") };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.findOrCreateAuth = findOrCreateAuth;
const checkPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const result = yield Auth_1.Auth.findOne({
            where: {
                password: (0, lib_1.getSHA256ofString)(password),
                email,
            },
        });
        if (!result) {
            return res.status(404).send("Contraseña incorrecta");
        }
        else {
            const authId = result.get("id");
            const token = (0, lib_1.createToken)(authId);
            return res.send({ token });
        }
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.checkPassword = checkPassword;
