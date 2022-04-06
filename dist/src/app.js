"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importDefault(require("express"));
// import { Socket } from "socket.io";
const bson_1 = require("bson");
const config_1 = require("./util/config");
const init = () => {
    const app = (0, express_1.default)();
    app.get('/', (req, res) => {
        res.status(200).send('Bloden Server working..');
    });
    app.use(express_1.default.json());
    // app.use(router);
    const httpServer = require("http").createServer(app);
    const io = require("socket.io")(httpServer, {});
    httpServer.listen(config_1.env.PORT, () => {
        console.log(`Listening on port ${config_1.env.PORT}`);
    });
    const allUsersChat = new bson_1.Map();
    const allUsersGames = new bson_1.Map();
};
exports.init = init;
