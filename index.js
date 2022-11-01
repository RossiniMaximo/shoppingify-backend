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
require("dotenv").config();
const app_1 = require("./app");
require("./models/Auth");
require("./models/User");
require("./models/Item");
require("./models/ShopLists");
const PORT = process.env.PORT || 5500;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /* await sequelize.sync({ alter: true }); */
            app_1.app.listen(PORT, console.log("server running on port :  ", PORT));
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
main();
