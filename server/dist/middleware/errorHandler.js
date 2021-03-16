"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = void 0;
var errHandler = function (err, _req, res, _next) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).json(err.message);
};
exports.errHandler = errHandler;
