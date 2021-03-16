"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var post_1 = require("./routes/post");
var user_1 = require("./routes/user");
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "/uploads")));
var fileFilter = function (_req, file, cb) {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        cb(null, uuid_1.v4().toString() + "_" + file.originalname);
    },
});
app.use("/posts/addpost", multer_1.default({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
}).single("file"));
app.use("/posts/updatepost", multer_1.default({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
}).single("file"));
app.use("/posts", post_1.postRouter);
app.use("/user", user_1.userRouter);
app.use(function (err, req, res, next) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).json(err.message);
});
mongoose_1.default
    .connect("mongodb://localhost:27017/snapshots", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    app.listen(PORT, function () { return console.log("Server Running on " + PORT); });
})
    .catch(function (err) {
    console.log(err);
});
