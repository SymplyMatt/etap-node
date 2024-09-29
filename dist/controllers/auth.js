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
const Student_1 = __importDefault(require("../models/Student"));
const Admin_1 = __importDefault(require("../models/Admin"));
const generateToken_1 = __importDefault(require("../config/generateToken"));
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, email, role } = req.body;
            try {
                let user;
                if (role !== 'student') {
                    user = yield Admin_1.default.findOne({ where: { email, firstName } });
                }
                else {
                    user = yield Student_1.default.findOne({ where: { email, firstName } });
                }
                if (!user) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                const token = (0, generateToken_1.default)({ id: user.id, email: user.email, role: role || 'student' });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000,
                });
                return res.status(200).json({
                    message: 'Login successful',
                    user
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: 'Failed to login',
                    error: error.message,
                });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token');
            return res.status(200).json({ message: 'Logout successful' });
        });
    }
    static getLoggedInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.id;
            try {
                const student = yield Student_1.default.findByPk(userId);
                const admin = yield Admin_1.default.findByPk(userId);
                const user = student || admin;
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json({
                    message: 'User retrieved successfully',
                    user
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: 'Failed to retrieve user',
                    error: error.message,
                });
            }
        });
    }
}
exports.default = AuthController;
