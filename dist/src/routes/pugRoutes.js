"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SignIn_1 = require("../app/auth/signin/SignIn");
const AddPug_1 = require("../app/pug/add/AddPug");
const GetAllPug_1 = require("../app/pug/getall/GetAllPug");
const pugRouter = (0, express_1.Router)();
const add = "/add";
const get = "/get";
const getAll = "/getall";
///
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        const date = new Date().toISOString().replace(':', '-').replace(':', '-').replace('.', '-');
        const name = date + file.originalname;
        callback(null, name);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png ' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({
    dest: 'uploads/', storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    // fileFilter : fileFilter
});
///
pugRouter.post(add, upload.single('newimage'), AddPug_1.addPug);
pugRouter.get(get, SignIn_1.signIn);
pugRouter.get(getAll, GetAllPug_1.getAllPugs);
exports.default = pugRouter;
