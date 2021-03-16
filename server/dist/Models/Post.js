"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    },
    createdBy: {
        _id: String,
        username: String,
    },
}, {
    _id: true,
    timestamps: true,
});
exports.default = mongoose_1.model("Posts", PostSchema);
