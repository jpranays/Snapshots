"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    password: String,
}, {
    _id: true,
    timestamps: true,
});
exports.default = mongoose_1.model("Users", UserSchema);
