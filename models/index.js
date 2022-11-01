"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shoplist = exports.Item = exports.User = void 0;
const Auth_1 = require("./Auth");
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const ShopLists_1 = require("./ShopLists");
Object.defineProperty(exports, "Shoplist", { enumerable: true, get: function () { return ShopLists_1.Shoplist; } });
const Item_1 = require("./Item");
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return Item_1.Item; } });
User_1.User.hasOne(Auth_1.Auth, {
    foreignKey: "user_id",
    sourceKey: "id",
});
Auth_1.Auth.belongsTo(User_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
});
User_1.User.hasMany(ShopLists_1.Shoplist, {
    foreignKey: "owner",
    sourceKey: "id",
});
ShopLists_1.Shoplist.belongsTo(User_1.User, {
    foreignKey: "owner",
    targetKey: "id",
});
ShopLists_1.Shoplist.belongsToMany(Item_1.Item, {
    through: "list_item",
});
Item_1.Item.belongsToMany(ShopLists_1.Shoplist, {
    through: "list_item",
});
