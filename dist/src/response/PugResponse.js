"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pugToResponsePageable = exports.pugToResponse = void 0;
function pugToResponse(pug, username, author) {
    let isLiked = false;
    pug.usersLike.forEach(value => { if (value == username) {
        isLiked = true;
    } });
    return {
        id: pug.id,
        date: pug.date,
        details: pug.details ? pug.details : [],
        imageData: pug.imageData,
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle ? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like,
        isLiked: isLiked,
        comments: pug.comments,
        author: author
    };
}
exports.pugToResponse = pugToResponse;
function pugToResponsePageable(pug, username, author) {
    let isLiked = false;
    pug.usersLike.forEach(value => { if (value == username) {
        isLiked = true;
    } });
    return {
        id: pug.id,
        date: pug.date,
        details: pug.details ? pug.details : [],
        // imageData: pug.imageData,
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle ? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like,
        isLiked: isLiked,
        comments: pug.comments.slice(-1),
        author: author
    };
}
exports.pugToResponsePageable = pugToResponsePageable;
