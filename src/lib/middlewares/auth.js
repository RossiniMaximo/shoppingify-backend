"use strict";
exports.__esModule = true;
exports.authMiddlware = void 0;
var __1 = require("..");
function authMiddlware(req, res, next) {
    var token = req.headers.authorization.split(" ")[1];
    var verify = (0, __1.verifyToken)(token);
    var data = verify.data;
    var authId = req.body.authId;
    if (authId == data) {
        next();
    }
    else {
        res.send({ error: "Users ids don't match" });
    }
}
exports.authMiddlware = authMiddlware;
