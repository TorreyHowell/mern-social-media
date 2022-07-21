"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userName: (0, zod_1.string)({
            required_error: 'A username is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'An email is required',
        }).email('not a valid email'),
        password: (0, zod_1.string)({
            required_error: 'A password is required',
        }).min(6, 'Minimum 6 characters required for password'),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'Password confirmation is required',
        }),
        firstName: (0, zod_1.string)().default(''),
        lastName: (0, zod_1.string)().default(''),
        dob: (0, zod_1.preprocess)((arg) => {
            if (typeof arg == 'string' || arg instanceof Date)
                return new Date(arg);
        }, (0, zod_1.date)({
            required_error: 'A dob is required',
        })),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});
