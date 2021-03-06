"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.deletePost = exports.editPost = exports.editPostLike = exports.addPost = exports.getPosts = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var Post_1 = __importDefault(require("../Models/Post"));
var getPosts = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.find({}, { updatedAt: 0, __v: 0 })];
            case 1:
                posts = _a.sent();
                res.status(200).json(posts);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPosts = getPosts;
var addPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, _b, file, createdBy, newPost, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, content = _a.content;
                _b = req.file, file = _b === void 0 ? null : _b;
                createdBy = {
                    _id: req._id,
                    username: req.username,
                };
                newPost = new Post_1.default({
                    title: title,
                    content: content,
                    image: file === null || file === void 0 ? void 0 : file.filename,
                    createdBy: createdBy,
                });
                return [4 /*yield*/, newPost.save()];
            case 1:
                _c.sent();
                res.status(201).json(newPost);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _c.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addPost = addPost;
var editPostLike = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, updateLike, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.body._id;
                return [4 /*yield*/, Post_1.default.updateOne({
                        _id: _id,
                    }, {
                        $inc: {
                            likes: 1,
                        },
                    })];
            case 1:
                updateLike = _a.sent();
                res.status(200).json(updateLike);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editPostLike = editPostLike;
var editPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, title, content, prevImage, _b, file, createdBy, updatedPost, err_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, _id = _a._id, title = _a.title, content = _a.content, prevImage = _a.prevImage;
                _b = req.file, file = _b === void 0 ? null : _b;
                createdBy = {
                    _id: req._id,
                    username: req.username,
                };
                if (file && prevImage) {
                    fs_1.default.promises
                        .unlink(path_1.default.join(path_1.default.resolve(), "../dist/uploads/" + prevImage))
                        .catch(function (err) {
                        console.log(err);
                    });
                }
                return [4 /*yield*/, Post_1.default.updateOne({
                        _id: _id,
                        "createdBy._id": createdBy._id,
                    }, {
                        $set: {
                            title: title,
                            content: content,
                            image: file ? file === null || file === void 0 ? void 0 : file.filename : prevImage[0],
                        },
                    })];
            case 1:
                _c.sent();
                return [4 /*yield*/, Post_1.default.findOne({ _id: _id }, { image: 1 })];
            case 2:
                updatedPost = _c.sent();
                res.status(200).json(updatedPost);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _c.sent();
                next(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editPost = editPost;
var deletePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, createdBy, prevImage, deletedPost, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                _id = req.body._id;
                createdBy = {
                    _id: req._id,
                    username: req.username,
                };
                return [4 /*yield*/, Post_1.default.findOne({ _id: _id }, { image: 1 })];
            case 1:
                prevImage = _a.sent();
                return [4 /*yield*/, Post_1.default.deleteOne({
                        _id: _id,
                        "createdBy._id": createdBy._id,
                    })];
            case 2:
                deletedPost = _a.sent();
                fs_1.default.promises
                    .unlink(path_1.default.join(path_1.default.resolve(), "../dist/uploads/" + (prevImage === null || prevImage === void 0 ? void 0 : prevImage.image)))
                    .catch(function (err) {
                    console.log(err);
                });
                res.status(200).json(deletedPost);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
var getPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, createdBy, post, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.params._id;
                createdBy = {
                    _id: req._id,
                    username: req.username,
                };
                return [4 /*yield*/, Post_1.default.find({
                        _id: _id,
                        "createdBy._id": createdBy._id,
                    }, { createdBy: 0, updatedAt: 0, __v: 0 })];
            case 1:
                post = _a.sent();
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPost = getPost;
