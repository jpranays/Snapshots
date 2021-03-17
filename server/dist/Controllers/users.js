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
exports.verifyToken = exports.signin = exports.verifyUser = exports.signup = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../Models/User"));
var nodemailer_1 = require("nodemailer");
var SENDER = "pranay.jadhav@moderncoe.edu.in";
var Transport = nodemailer_1.createTransport({
    service: "gmail",
    auth: {
        user: SENDER,
        pass: "Admin@987",
    },
});
var mailOptions = {
    from: SENDER,
    to: "pranay1315@gmail.com",
    subject: "ONE TIME PASSWORD",
    html: "",
};
var signup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, confirmPassword, existingUser, otp, newUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                if (!(password !== confirmPassword)) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).json({ message: "Passwords dont match" })];
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({
                        username: username,
                        verified: true,
                    })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(422).json({ message: "User Already Exists" })];
                }
                otp = Math.floor(Math.random() * 10000);
                newUser = new User_1.default({
                    username: username,
                    email: email,
                    loginToken: {
                        token: otp,
                    },
                });
                mailOptions.to = email;
                mailOptions.subject = "One Time Password";
                mailOptions.html = "<h2>Kindly Enter This OTP To Register Account ,OTP Is Valid For Only 10 Minutes</h2><h3>" + otp + "</h3>";
                return [4 /*yield*/, Promise.all([newUser.save(), Transport.sendMail(mailOptions)])];
            case 3:
                _b.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json({ message: "OTP sent successfully,check your Email" })];
            case 4:
                err_1 = _b.sent();
                console.log(err_1);
                next(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var verifyUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, OTP, existingUser, now, isValid, hashedPassword, newUser, err_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, OTP = _a.OTP;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 7, , 8]);
                return [4 /*yield*/, User_1.default.findOne({
                        username: username,
                        email: email,
                        "loginToken.token": OTP,
                    })];
            case 2:
                existingUser = _c.sent();
                if (!existingUser) return [3 /*break*/, 5];
                now = Date.now();
                isValid = now -
                    Date.parse((_b = existingUser === null || existingUser === void 0 ? void 0 : existingUser.loginToken) === null || _b === void 0 ? void 0 : _b.tokenCreated);
                if (isValid > 1000 * 60 * 10) {
                    return [2 /*return*/, res.status(422).json({ message: "Token Expired " })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
            case 3:
                hashedPassword = _c.sent();
                newUser = new User_1.default({
                    username: username,
                    email: email,
                    password: hashedPassword,
                    verified: true,
                });
                mailOptions.to = email;
                mailOptions.subject = "Account Created Successfully";
                mailOptions.html = "<h2>Thanks for using SnapShots</h2><h1>Welcome aboard " + username + "</h1>";
                return [4 /*yield*/, Promise.all([
                        newUser.save(),
                        Transport.sendMail(mailOptions),
                        User_1.default.deleteMany({ username: username, verified: false }),
                    ])];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(201).json({ message: "Account created successfully" })];
            case 5: return [2 /*return*/, res.status(401).json({ message: "Something went wrong" })];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _c.sent();
                console.log(err_2);
                next(err_2);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.verifyUser = verifyUser;
var signin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, existingUser, isSame, token, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({
                        username: username,
                        verified: true,
                    })];
            case 2:
                existingUser = _b.sent();
                if (!existingUser) {
                    return [2 /*return*/, res.status(404).json({ message: "No Such User Found" })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, existingUser.password)];
            case 3:
                isSame = _b.sent();
                if (!isSame) {
                    return [2 /*return*/, res
                            .status(422)
                            .json({ message: "Username or Password wont match" })];
                }
                token = jsonwebtoken_1.default.sign({
                    _id: existingUser._id,
                    username: username,
                }, "test", {
                    expiresIn: "1h",
                });
                return [2 /*return*/, res.status(200).json({
                        token: token,
                        _id: existingUser._id,
                        username: existingUser.username,
                        message: "User Successfully Logged-in",
                    })];
            case 4:
                err_3 = _b.sent();
                next(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
var verifyToken = function (req, res) {
    var token = req.body.oldToken;
    var decodedData = jsonwebtoken_1.default.verify(token, "test");
    if (decodedData) {
        res.status(200).json({ decodedData: decodedData });
    }
    else {
        res.status(400);
    }
};
exports.verifyToken = verifyToken;
