"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const algoliasearch_1 = require("algoliasearch");
require("dotenv").config();
const client = (0, algoliasearch_1.default)(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX);
exports.index = index;
