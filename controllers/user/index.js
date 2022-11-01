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
exports.getMe = exports.getAllUsers = exports.findOrCreateUser = void 0;
const lib_1 = require("../../lib");
const models_1 = require("../../src/models");
const auth_1 = require("../auth");
const findOrCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, password } = req.body;
    try {
        const user = yield models_1.User.create({
            fullname,
            email,
        });
        if (!user) {
            return res.status(500).send({ error: "Error while creating the user" });
        }
        const userId = user.get("id");
        const { auth, authId } = yield (0, auth_1.findOrCreateAuth)({
            email,
            password,
            userId,
        });
        if (auth) {
            const token = (0, lib_1.createToken)(authId);
            res.send({ token, authId, userId });
        }
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.findOrCreateUser = findOrCreateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll();
        return res.send(users);
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
// auth middleware
const getMe = (req, res, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const me = yield models_1.User.findByPk(userId);
        return res.send(me);
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.getMe = getMe;
