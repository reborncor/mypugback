"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./util/config");
const routes_1 = __importDefault(require("./routes/routes"));
const multer = require('multer');
const init = () => {
    const app = (0, express_1.default)();
    app.get('/', (req, res) => {
        console.log('Bloden server');
        res.status(200).send('Bloden Server working..');
    });
    app.use(express_1.default.json());
    app.use(routes_1.default);
    const httpServer = require("http").createServer(app);
    // const io = require("socket.io")(httpServer,{});
    httpServer.listen(config_1.env.PORT, () => {
        console.log(`Listening on port ${config_1.env.PORT}`);
    });
};
exports.init = init;
