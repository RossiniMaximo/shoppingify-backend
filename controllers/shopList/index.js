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
exports.deleteItemFromShopList = exports.addItemToShoplist = exports.getShoppingListItems = exports.updateShoppingListById = exports.deleteShoppingListById = exports.getShoppingListById = exports.getMyShoppingLists = exports.createShoppingList = void 0;
const algolia_1 = require("../../database/algolia");
const models_1 = require("../../src/models");
// auth middleware
const createShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, userId } = req.body;
        const [newShopList, created] = yield models_1.Shoplist.findOrCreate({
            where: { title, owner: userId },
        });
        res.send(newShopList);
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.createShoppingList = createShoppingList;
// auth middleware
const getMyShoppingLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const shopLists = yield models_1.Shoplist.findAll({ where: { owner: userId } });
        return res.send(shopLists);
    }
    catch (e) {
        return res.send({ error: e.message });
    }
});
exports.getMyShoppingLists = getMyShoppingLists;
// auth middleware
const getShoppingListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const id = req.params.id;
        const shopList = yield models_1.Shoplist.findOne({ where: { id, owner: userId } });
        const data = shopList.get();
        return res.send(data);
    }
    catch (e) {
        return res.send({ error: e.message });
    }
});
exports.getShoppingListById = getShoppingListById;
// auth middleware
const deleteShoppingListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const id = req.params.id;
        yield models_1.Shoplist.destroy({
            where: {
                id: id,
                owner: userId,
            },
        });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.deleteShoppingListById = deleteShoppingListById;
const updateShoppingListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (status == "completed" || status == "cancelled") {
            const shoppingList = yield models_1.Shoplist.findByPk(id);
            shoppingList.completed = status;
            yield shoppingList.save();
            return res.send(true);
        }
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.updateShoppingListById = updateShoppingListById;
// I had a typo in the second if , I only had 1 equal sign instead of 2 and that was converting
// all the non-vegetable items into meat and fish category.
const getShoppingListItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meat = [];
        const beverages = [];
        const pasta = [];
        const fruit = [];
        const vegetables = [];
        const dairy = [];
        let newShoppinglist;
        const shoppingListId = req.params.id;
        const shoppinglist = yield models_1.Shoplist.findByPk(shoppingListId);
        newShoppinglist = shoppinglist;
        const items = yield newShoppinglist.getItems();
        items.map((i) => {
            if (i.category == "Vegetables") {
                vegetables.push(i);
            }
            if (i.category == "Meat & Fish") {
                meat.push(i);
            }
            if (i.category == "Dairy products") {
                dairy.push(i);
            }
            if (i.category == "Fruit") {
                fruit.push(i);
            }
            if (i.category == "Pasta") {
                pasta.push(i);
            }
            if (i.category == "Beverages") {
                beverages.push(i);
            }
        });
        return res.send({ meat, vegetables, beverages, dairy, pasta, fruit });
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.getShoppingListItems = getShoppingListItems;
const addItemToShoplist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shoplistId = req.params.id;
    const { items } = req.body;
    let itemsIds = [];
    let newShoppingList;
    try {
        const shoppingList = yield models_1.Shoplist.findOne({
            where: {
                id: shoplistId,
            },
        });
        if (shoppingList === null) {
            throw { error: { message: "Shopping list not found." } };
        }
        else {
            newShoppingList = shoppingList;
        }
        yield Promise.allSettled(items.map((i) => __awaiter(void 0, void 0, void 0, function* () {
            const item = yield algolia_1.index.search(i, {
                hitsPerPage: 1,
                attributesToHighlight: [],
            });
            return itemsIds.push(item.hits[0].objectID);
        })));
        yield newShoppingList.addItems(itemsIds);
        res.status(201).send(true);
    }
    catch (error) {
        return res.status(500).send({ error: error.message || error });
    }
});
exports.addItemToShoplist = addItemToShoplist;
const deleteItemFromShopList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = req.params.id;
        const { itemName } = req.body;
        const list = yield models_1.Shoplist.findByPk(listId);
        let newList;
        newList = list;
        const newListItems = yield newList.getItems();
        const result = newListItems.find((item) => {
            if (item.name == itemName) {
                return item;
            }
        });
        yield newList.removeItem(result);
        res.sendStatus(201);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deleteItemFromShopList = deleteItemFromShopList;
