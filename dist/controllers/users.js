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
class UsersController {
    static emailExists(model, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model.findOne({ where: { email } });
            return user !== null;
        });
    }
    static createUser(model, userData, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, role } = userData;
            if (yield UsersController.emailExists(model, email)) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            try {
                const user = yield model.create(userData);
                const token = (0, generateToken_1.default)({ id: user.id, email: user.email, role: role || 'student' });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });
                return res.status(201).json({
                    message: `${model.name} created successfully`,
                    user,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: `Failed to create ${model.name.toLowerCase()}`,
                    error: error.message,
                });
            }
        });
    }
    static createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = Object.assign({}, req.body);
            return UsersController.createUser(Student_1.default, userData, res);
        });
    }
    static createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = Object.assign(Object.assign({}, req.body), { role: req.body.role });
            return UsersController.createUser(Admin_1.default, userData, res);
        });
    }
    static getStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield Student_1.default.findAll();
                return res.status(200).json({
                    message: 'Students retrieved successfully',
                    students,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: 'Failed to retrieve students',
                    error: error.message,
                });
            }
        });
    }
    static getAdmins(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield Admin_1.default.findAll();
                return res.status(200).json({
                    message: 'Admins retrieved successfully',
                    admins,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: 'Failed to retrieve admins',
                    error: error.message,
                });
            }
        });
    }
}
exports.default = UsersController;
