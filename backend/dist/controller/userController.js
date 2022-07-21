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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const lodash_1 = require("lodash");
const CreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email } = req.body;
        const userNameExists = yield userModel_1.default.findOne({ userName });
        const emailExists = yield userModel_1.default.findOne({ email });
        if (userNameExists && emailExists) {
            return next(new Error('Username and email already taken'));
        }
        else if (emailExists) {
            return next(new Error('Email already in use'));
        }
        else if (userNameExists) {
            return next(new Error('Username already taken'));
        }
        const user = yield userModel_1.default.create(req.body);
        if (user) {
            return res.status(201).json((0, lodash_1.omit)(user.toJSON(), 'password'));
        }
        res.status(400);
        return next(new Error('Invalid user data'));
    }
    catch (error) {
        res.status(400);
        return next(error);
    }
});
exports.CreateUser = CreateUser;
