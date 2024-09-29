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
 * /users/create/customer:
 *   post:
 *     summary: Create a new customer
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: customer@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               location:
 *                 type: string
 *                 example: New York
 *               phone:
 *                 type: string
 *                 example: +2347012345678
 *                 description: Must be a valid Nigerian phone number starting with +234 or 0
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/create',
    validate,
    UsersController.getAdmins
);

export default router;
