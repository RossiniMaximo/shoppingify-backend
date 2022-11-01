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
exports.updateItemsToAlgolia = exports.createItem = exports.getItemByName = exports.getItemsSortedByCategory = void 0;
const models_1 = require("../../src/models");
const algolia_1 = require("../../database/algolia");
const getItemsSortedByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let meatAndFish = [];
        let vegetables = [];
        let fruits = [];
        let beverages = [];
        let pasta = [];
        let dairyProducts = [];
        const allItems = yield algolia_1.index.search("", {
            attributesToHighlight: [],
            hitsPerPage: 1000,
        });
        allItems.hits.filter((item) => {
            if (item.category === "Meat & Fish") {
                meatAndFish.push(item);
            }
            if (item.category === "Vegetables") {
                vegetables.push(item);
            }
            if (item.category === "Fruits") {
                fruits.push(item);
            }
            if (item.category === "Beverages") {
                beverages.push(item);
            }
            if (item.category === "Dairy products") {
                dairyProducts.push(item);
            }
            if (item.category === "Pasta") {
                pasta.push(item);
            }
        });
        return res.send({
            meatAndFish,
            vegetables,
            fruits,
            beverages,
            pasta,
            dairyProducts,
        });
    }
    catch (error) {
        return res.send({ error: error.message });
    }
});
exports.getItemsSortedByCategory = getItemsSortedByCategory;
const getItemByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemName } = req.body;
        const result = yield algolia_1.index.search(itemName, {
            attributesToHighlight: [],
            attributesToRetrieve: [
                "name",
                "description",
                "img",
                "category",
                "objectID",
            ],
        });
        res.send(result.hits);
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.getItemByName = getItemByName;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, img, category } = req.body.item;
    try {
        const newItem = yield models_1.Item.create({
            name,
            description,
            img,
            category,
        });
        const newItemForAlgolia = {
            name,
            description,
            img,
            category,
            objectID: newItem.get("id"),
        };
        yield algolia_1.index.saveObject(newItemForAlgolia);
        return res.send(newItem);
    }
    catch (error) {
        return res.send({ error: error.message });
    }
});
exports.createItem = createItem;
const updateItemsToAlgolia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield models_1.Item.findAll();
    const itemsForAlgolia = items.map((item) => {
        return {
            name: item.name,
            description: item.description,
            img: item.img,
            category: item.category,
            objectID: item.id,
        };
    });
    yield algolia_1.index.saveObjects(itemsForAlgolia);
    res.send(itemsForAlgolia);
});
exports.updateItemsToAlgolia = updateItemsToAlgolia;
