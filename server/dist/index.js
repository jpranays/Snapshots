"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var post_1 = require("./routes/post");
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/posts", post_1.postRouter);
mongoose_1.default
    .connect("mongodb://localhost:27017/posts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    app.listen(PORT, function () { return console.log("Server Running on " + PORT); });
})
    .catch(function (err) {
    console.log(err);
});
