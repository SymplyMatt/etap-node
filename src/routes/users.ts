import express from 'express';
import validate from '../middleware/validate';
import { body, query } from 'express-validator';
import UsersController from '../controllers/users';
import { adminRoles } from '../config/utils';
import authenticateToken from '../middleware/authenticateToken';
import authenticateAdmin from '../middleware/authenticateAdmin';

const router = express.Router();

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
router.post('/create/student',
    [
        body('firstName').isString().withMessage('First name is required'),
        body('lastName').isString().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Email address is required and must be valid'),
    ],    
    validate,
    UsersController.createStudent
);

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
router.post('/create/admin',
    // authenticateToken,
    // authenticateAdmin,
    [
        body('firstName').isString().withMessage('First name is required'),
        body('lastName').isString().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Email address is required and must be valid'),
        body('role').isIn(['admin', 'teacher']).withMessage('Role must be either "admin" or "teacher"'),
    ],
    validate,
    UsersController.createAdmin
);

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
router.get('/students',
    authenticateToken,
    authenticateAdmin,
    UsersController.getStudents
);


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
router.get('/admins',
    authenticateToken,
    authenticateAdmin,
UsersController.getAdmins
);

export default router;
