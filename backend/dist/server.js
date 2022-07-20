"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello');
});
app.listen(PORT, () => console.log(colors_1.default.blue(`Server running on port: ${process.env.PORT}`)));
