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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.getAllUsers = exports.findOrCreateUser = void 0;
var lib_1 = require("../../lib");
var models_1 = require("../../models");
var auth_1 = require("../auth");
var findOrCreateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullname, email, password, user, userId, _b, auth, authId, token, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, fullname = _a.fullname, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.User.create({
                        fullname: fullname,
                        email: email,
                    })];
            case 2:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(500).send({ error: "Error while creating the user" })];
                }
                userId = user.get("id");
                return [4 /*yield*/, (0, auth_1.findOrCreateAuth)({
                        email: email,
                        password: password,
                        userId: userId,
                    })];
            case 3:
                _b = _c.sent(), auth = _b.auth, authId = _b.authId;
                if (auth) {
                    token = (0, lib_1.createToken)(authId);
                    res.send({ token: token, authId: authId, userId: userId });
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                return [2 /*return*/, res.status(500).send({ error: error_1.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.findOrCreateUser = findOrCreateUser;
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.User.findAll()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.send(users)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).send({ error: error_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
// auth middleware
var getMe = function (req, res, token) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, me, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body.userId;
                return [4 /*yield*/, models_1.User.findByPk(userId)];
            case 1:
                me = _a.sent();
                return [2 /*return*/, res.send(me)];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).send({ error: error_3.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMe = getMe;
