"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pugToResponse = void 0;
function pugToResponse(pug) {
    return {
        details: pug.details ? pug.details : [],
        imageData: pug.imageData,
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle ? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like
    };
}
exports.pugToResponse = pugToResponse;
