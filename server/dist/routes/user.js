"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var users_1 = require("../Controllers/users");
exports.userRouter = express_1.Router();
exports.userRouter.post("/signup", users_1.signup);
exports.userRouter.post("/signin", users_1.signin);
exports.userRouter.post("/verifytoken", users_1.verifyToken);