"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
var express_1 = require("express");
var posts_1 = require("../Controllers/posts");
var posts_2 = require("../Controllers/posts");
exports.postRouter = express_1.Router();
exports.postRouter.get("/", posts_1.allPosts);
exports.postRouter.post("/addPost", posts_2.createPost);
