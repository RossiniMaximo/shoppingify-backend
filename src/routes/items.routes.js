"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var item_1 = require("../src/controllers/item");
var router = (0, express_1.Router)();
// Returns all items for main page.
router.get("/items", item_1.getItemsSortedByCategory);
router.post("/item", item_1.getItemByName);
// Creates a new item.
router.post("/items", item_1.createItem);
router.post("/items/update", item_1.updateItemsToAlgolia);
exports.default = router;
