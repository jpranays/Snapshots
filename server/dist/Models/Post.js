"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    postData: String,
    createdBy: String,
});
exports.default = mongoose_1.model("posts", PostSchema);