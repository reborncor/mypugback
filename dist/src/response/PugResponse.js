"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pugToResponsePageableSorted = exports.pugToResponseNoComment = exports.pugToResponse = void 0;
function pugToResponse(pug, username, author) {
    let isLiked = false;
    pug.usersLike.forEach((value) => {
        if (value == username) {
            isLiked = true;
        }
    });
    return {
        id: pug.id,
        date: pug.date,
        details: pug.details ? pug.details : [],
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle ? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like,
        isLiked: isLiked,
        isCrop: pug.isCrop ? pug.isCrop : false,
        height: pug.height ? pug.height : 1,
        comments: pug.comments,
        author: author !== null && author !== void 0 ? author : null,
        numberOfComments: pug.comments.length,
    };
}
exports.pugToResponse = pugToResponse;
function pugToResponseNoComment(pug, user, author, numberOfComments) {
    let isLiked = false;
    pug.usersLike.forEach((value) => {
        if (value == user.username) {
            isLiked = true;
        }
    });
    return {
        id: pug.id,
        date: pug.date,
        details: pug.details ? pug.details : [],
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle ? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like,
        isLiked: isLiked,
        isCrop: pug.isCrop ? pug.isCrop : false,
        height: pug.height ? pug.height : 1,
        author: author !== null && author !== void 0 ? author : null,
        numberOfComments: numberOfComments,
        comments: [],
    };
}
exports.pugToResponseNoComment = pugToResponseNoComment;
function pugToResponsePageableSorted(pug, user, author) {
    let isLiked = false;
    pug.usersLike.forEach((value) => {
        if (value == user.username) {
            isLiked = true;
        }
    });
    return {
        id: pug.id,
        date: pug.date,
        details: pug.details ? pug.details : [],
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat ? pug.imageFormat : "",
        imageTitle: pug.imageTitle ? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like ? pug.like : 0,
        isLiked: isLiked ? isLiked : false,
        isCrop: pug.isCrop ? pug.isCrop : false,
        height: pug.height ? pug.height : 1,
        comments: pug.comments.slice(-1),
        author: author !== null && author !== void 0 ? author : null,
        numberOfComments: pug.comments.length,
    };
}
exports.pugToResponsePageableSorted = pugToResponsePageableSorted;
