"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const items_routes_1 = __importDefault(require("./routes/items.routes"));
const lists_routes_1 = __importDefault(require("./routes/lists.routes"));
const me_routes_1 = __importDefault(require("./routes/me.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes."));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
const corsOptions = {
    origin: "https://shoppingify-front.vercel.app",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use([items_routes_1.default, lists_routes_1.default, me_routes_1.default, user_routes_1.default]);
