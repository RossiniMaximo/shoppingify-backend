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
exports.deleteItemFromShopList = exports.addItemToShoplist = exports.getShoppingListItems = exports.updateShoppingListById = exports.deleteShoppingListById = exports.getShoppingListById = exports.getMyShoppingLists = exports.createShoppingList = void 0;
var algolia_1 = require("../../database/algolia");
var models_1 = require("../../models");
// auth middleware
var createShoppingList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, userId, _b, newShopList, created, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, userId = _a.userId;
                return [4 /*yield*/, models_1.Shoplist.findOrCreate({
                        where: { title: title, owner: userId },
                    })];
            case 1:
                _b = _c.sent(), newShopList = _b[0], created = _b[1];
                res.send(newShopList);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                return [2 /*return*/, { error: error_1.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createShoppingList = createShoppingList;
// auth middleware
var getMyShoppingLists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, shopLists, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body.userId;
                return [4 /*yield*/, models_1.Shoplist.findAll({ where: { owner: userId } })];
            case 1:
                shopLists = _a.sent();
                return [2 /*return*/, res.send(shopLists)];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, res.send({ error: e_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMyShoppingLists = getMyShoppingLists;
// auth middleware
var getShoppingListById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, id, shopList, data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, models_1.Shoplist.findOne({ where: { id: id, owner: userId } })];
            case 2:
                shopList = _a.sent();
                data = shopList.get();
                return [2 /*return*/, res.send(data)];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, res.send({ error: e_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getShoppingListById = getShoppingListById;
// auth middleware
var deleteShoppingListById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, id, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, models_1.Shoplist.destroy({
                        where: {
                            id: id,
                            owner: userId,
                        },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).send({ error: error_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteShoppingListById = deleteShoppingListById;
var updateShoppingListById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status_1, shoppingList, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                status_1 = req.body.status;
                if (!(status_1 == "completed" || status_1 == "cancelled")) return [3 /*break*/, 3];
                return [4 /*yield*/, models_1.Shoplist.findByPk(id)];
            case 1:
                shoppingList = _a.sent();
                shoppingList.completed = status_1;
                return [4 /*yield*/, shoppingList.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.send(true)];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).send({ error: error_3.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateShoppingListById = updateShoppingListById;
// I had a typo in the second if , I only had 1 equal sign instead of 2 and that was converting
// all the non-vegetable items into meat and fish category.
var getShoppingListItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var meat_1, beverages_1, pasta_1, fruit_1, vegetables_1, dairy_1, newShoppinglist, shoppingListId, shoppinglist, items, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                meat_1 = [];
                beverages_1 = [];
                pasta_1 = [];
                fruit_1 = [];
                vegetables_1 = [];
                dairy_1 = [];
                newShoppinglist = void 0;
                shoppingListId = req.params.id;
                return [4 /*yield*/, models_1.Shoplist.findByPk(shoppingListId)];
            case 1:
                shoppinglist = _a.sent();
                newShoppinglist = shoppinglist;
                return [4 /*yield*/, newShoppinglist.getItems()];
            case 2:
                items = _a.sent();
                items.map(function (i) {
                    if (i.category == "Vegetables") {
                        vegetables_1.push(i);
                    }
                    if (i.category == "Meat & Fish") {
                        meat_1.push(i);
                    }
                    if (i.category == "Dairy products") {
                        dairy_1.push(i);
                    }
                    if (i.category == "Fruit") {
                        fruit_1.push(i);
                    }
                    if (i.category == "Pasta") {
                        pasta_1.push(i);
                    }
                    if (i.category == "Beverages") {
                        beverages_1.push(i);
                    }
                });
                return [2 /*return*/, res.send({ meat: meat_1, vegetables: vegetables_1, beverages: beverages_1, dairy: dairy_1, pasta: pasta_1, fruit: fruit_1 })];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).send({ error: error_4.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getShoppingListItems = getShoppingListItems;
var addItemToShoplist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var shoplistId, items, itemsIds, newShoppingList, shoppingList, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shoplistId = req.params.id;
                items = req.body.items;
                itemsIds = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, models_1.Shoplist.findOne({
                        where: {
                            id: shoplistId,
                        },
                    })];
            case 2:
                shoppingList = _a.sent();
                if (shoppingList === null) {
                    throw { error: { message: "Shopping list not found." } };
                }
                else {
                    newShoppingList = shoppingList;
                }
                return [4 /*yield*/, Promise.allSettled(items.map(function (i) { return __awaiter(void 0, void 0, void 0, function () {
                        var item;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, algolia_1.index.search(i, {
                                        hitsPerPage: 1,
                                        attributesToHighlight: [],
                                    })];
                                case 1:
                                    item = _a.sent();
                                    return [2 /*return*/, itemsIds.push(item.hits[0].objectID)];
                            }
                        });
                    }); }))];
            case 3:
                _a.sent();
                return [4 /*yield*/, newShoppingList.addItems(itemsIds)];
            case 4:
                _a.sent();
                res.status(201).send(true);
                return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).send({ error: error_5.message || error_5 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addItemToShoplist = addItemToShoplist;
var deleteItemFromShopList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var listId, itemName_1, list, newList, newListItems, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                listId = req.params.id;
                itemName_1 = req.body.itemName;
                return [4 /*yield*/, models_1.Shoplist.findByPk(listId)];
            case 1:
                list = _a.sent();
                newList = void 0;
                newList = list;
                return [4 /*yield*/, newList.getItems()];
            case 2:
                newListItems = _a.sent();
                result = newListItems.find(function (item) {
                    if (item.name == itemName_1) {
                        return item;
                    }
                });
                return [4 /*yield*/, newList.removeItem(result)];
            case 3:
                _a.sent();
                res.sendStatus(201);
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                res.status(500).send({ error: error_6.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteItemFromShopList = deleteItemFromShopList;
