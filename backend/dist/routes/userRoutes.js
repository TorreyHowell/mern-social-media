"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const userSchema_1 = require("../validation/userSchema");
const router = express_1.default.Router();
router.post('/', (0, validateResource_1.default)(userSchema_1.createUserSchema), userController_1.CreateUser);
exports.default = router;
