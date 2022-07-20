"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'Please add a user name'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dob: {
        type: Date,
    },
});
exports.default = mongoose_1.default.model('User', userSchema);
