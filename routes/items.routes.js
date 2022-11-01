"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_1 = require("../controllers/item");
const router = (0, express_1.Router)();
// Returns all items for main page.
router.get("/items", item_1.getItemsSortedByCategory);
router.post("/item", item_1.getItemByName);
// Creates a new item.
router.post("/items", item_1.createItem);
router.post("/items/update", item_1.updateItemsToAlgolia);
exports.default = router;
