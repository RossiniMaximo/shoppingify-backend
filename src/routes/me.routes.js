"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var shopList_1 = require("../controllers/shopList");
var router = (0, express_1.Router)();
// Deletes a item from my shopping list.
router.delete("/my-shopping-list/:id");
// Updates the state of an item from my shopping list (How many pieces)
router.put("/my-shopping-list/:id", shopList_1.updateShoppingListById);
exports.default = router;
