"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv = __importStar(require("dotenv"));
var multer_1 = __importDefault(require("multer"));
var mongoose_1 = __importDefault(require("mongoose"));
var uuid_1 = require("uuid");
var post_1 = require("./routes/post");
var user_1 = require("./routes/user");
var app = express_1.default();
dotenv.config({ path: "../../.env" });
var PORT = process.env.PORT || 5000;
console.log(path_1.default.resolve());
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
    .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    app.listen(PORT, function () { return console.log("Server Running on " + PORT); });
})
    .catch(function (err) {
    console.log(process.env.DB_CONNECTION);
    console.log(err);
});
