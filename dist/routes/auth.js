"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const express_validator_1 = require("express-validator");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.default.Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
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
 *                 description: First name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: Email address of the user
 *               role:
 *                 type: string
 *                 example: admin
 *                 description: Role of the user (optional; use 'admin' or omit for student)
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       example: admin
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Failed to login
 */
router.post('/login', [
    (0, express_validator_1.body)('firstName').isString().withMessage('First name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email address is required and must be valid'),
], validate_1.default, auth_1.default.login);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       500:
 *         description: Failed to logout
 */
router.post('/logout', authenticateToken_1.default, auth_1.default.getLoggedInUser);
/**
 * @swagger
 * /auth/getLoggedInUser:
 *   get:
 *     summary: Get logged-in user's information
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       example: admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to retrieve user
 */
router.get('/getLoggedInUser', authenticateToken_1.default, auth_1.default.getLoggedInUser);
exports.default = router;
