"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const items_routes_1 = require("./routes/items.routes");
const lists_routes_1 = require("./routes/lists.routes");
const me_routes_1 = require("./routes/me.routes");
const user_routes_1 = require("./routes/user.routes.");
const cors = require("cors");
const path = require("path");
const app = express();
exports.app = app;
const corsOptions = {
    origin: "https://shoppingify-front.vercel.app",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use([items_routes_1.default, lists_routes_1.default, me_routes_1.default, user_routes_1.default]);
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
