"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        var decodedData = jsonwebtoken_1.default.verify(token, "test");
        req._id = decodedData === null || decodedData === void 0 ? void 0 : decodedData._id;
        next();
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        res.status(err.statusCode).json(err.message);
    }
};
exports.auth = auth;
