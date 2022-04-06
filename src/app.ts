import express, {Request, Router} from "express";

import {Map} from "bson";
import {env} from "./util/config";
import router from "./routes/routes";
const multer = require('multer');


const init = () => {

    const app = express();


    app.get('/', (req : any, res: any) => {
        console.log('Bloden server');
        res.status(200).send('Bloden Server working..');
    });

    app.use(express.json());
    app.use(router);

    const httpServer =  require("http").createServer(app);
    // const io = require("socket.io")(httpServer,{});

    httpServer.listen(env.PORT, () => {
        console.log(`Listening on port ${env.PORT}`);
    });




}

export {init}
