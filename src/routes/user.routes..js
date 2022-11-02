"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var shopList_1 = require("../controllers/shopList");
var user_1 = require("../controllers/user");
var router = (0, express_1.Router)();
router.get("/users", user_1.getAllUsers);
router.get("/users/login", auth_1.checkPassword);
router.post("/users", user_1.findOrCreateUser);
router.get("/users/me", user_1.getMe);
// Returns shopping list's history.
router.post("/user/history", shopList_1.getMyShoppingLists);
exports.default = router;
