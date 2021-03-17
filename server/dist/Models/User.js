"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    password: String,
    loginToken: {
        token: String,
        tokenCreated: {
            type: Date,
            default: Date.now(),
        },
    },
    emailToken: {
        token: String,
        tokenCreated: { type: Date, default: Date.now() },
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {
    _id: true,
    timestamps: true,
});
exports.default = mongoose_1.model("Users", UserSchema);
