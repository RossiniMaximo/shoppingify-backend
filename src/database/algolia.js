"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
var algoliasearch_1 = __importDefault(require("algoliasearch"));
require("dotenv").config();
var client = (0, algoliasearch_1.default)(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
var index = client.initIndex(process.env.ALGOLIA_INDEX);
exports.index = index;
