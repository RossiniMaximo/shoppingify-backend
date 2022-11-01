"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlware = void 0;
const __1 = require("..");
function authMiddlware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const verify = (0, __1.verifyToken)(token);
    const { data } = verify;
    const { authId } = req.body;
    if (authId == data) {
        next();
    }
    else {
        res.send({ error: "Users ids don't match" });
    }
}
exports.authMiddlware = authMiddlware;
