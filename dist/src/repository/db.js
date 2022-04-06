"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const config_1 = require("../util/config");
const monk = require("monk");
exports.db = monk(config_1.env.DBURL);
console.log("Connected to DB");
