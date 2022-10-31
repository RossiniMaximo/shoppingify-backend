"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shopList_1 = require("../controllers/shopList");
const router = (0, express_1.Router)();
// Deletes a item from my shopping list.
router.delete("/my-shopping-list/:id");
// Updates the state of an item from my shopping list (How many pieces)
router.put("/my-shopping-list/:id", shopList_1.updateShoppingListById);
exports.default = router;
