"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_1 = __importDefault(require("./swagger"));
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.use('/users', users_1.default);
router.use('/auth', auth_1.default);
router.use('/', swagger_1.default);
exports.default = router;
