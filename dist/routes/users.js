"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const express_validator_1 = require("express-validator");
const users_1 = __importDefault(require("../controllers/users"));
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const authenticateAdmin_1 = __importDefault(require("../middleware/authenticateAdmin"));
const router = express_1.default.Router();
/**
 * @swagger
 * /users/create/student:
 *   post:
 *     summary: Create a new student
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *                 description: First name of the student
 *               lastName:
 *                 type: string
 *                 example: Doe
 *                 description: Last name of the student
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *                 description: Must be a unique and valid email address
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/create/student', [
    (0, express_validator_1.body)('firstName').isString().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').isString().withMessage('Last name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email address is required and must be valid'),
], validate_1.default, users_1.default.createStudent);
/**
 * @swagger
 * /users/create/admin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane
 *                 description: First name of the admin
 *               lastName:
 *                 type: string
 *                 example: Smith
 *                 description: Last name of the admin
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *                 description: Must be a unique and valid email address
 *               role:
 *                 type: string
 *                 enum: [admin, teacher]
 *                 example: admin
 *                 description: The role of the user (must be either 'admin' or 'teacher')
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/create/admin', authenticateToken_1.default, authenticateAdmin_1.default, [
    (0, express_validator_1.body)('firstName').isString().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').isString().withMessage('Last name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email address is required and must be valid'),
    (0, express_validator_1.body)('role').isIn(['admin', 'teacher']).withMessage('Role must be either "admin" or "teacher"'),
], validate_1.default, users_1.default.createAdmin);
/**
 * @swagger
 * /users/students:
 *   get:
 *     summary: Retrieve all students
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Students retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Students retrieved successfully
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: student@example.com
 *       500:
 *         description: Server error
 */
router.get('/students', authenticateToken_1.default, authenticateAdmin_1.default, users_1.default.getStudents);
/**
 * @swagger
 * /users/admins:
 *   get:
 *     summary: Retrieve all admins
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Admins retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admins retrieved successfully
 *                 admins:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: Alice
 *                       lastName:
 *                         type: string
 *                         example: Smith
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: admin@example.com
 *                       role:
 *                         type: string
 *                         example: admin
 *       500:
 *         description: Server error
 */
router.get('/admins', authenticateToken_1.default, authenticateAdmin_1.default, users_1.default.getAdmins);
exports.default = router;
