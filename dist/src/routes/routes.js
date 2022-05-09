"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const pugRoutes_1 = __importDefault(require("./pugRoutes"));
const conversationRoute_1 = __importDefault(require("./conversationRoute"));
const router = (0, express_1.Router)();
router.use('/user', userRoutes_1.default);
router.use('/pug', pugRoutes_1.default);
router.use('/conversation', conversationRoute_1.default);
exports.default = router;
