import express from 'express';
import validate from '../middleware/validate';
import { body, param, query } from 'express-validator';
import LessonsController from '../controllers/lessons';
import authenticateToken from '../middleware/authenticateToken';
import authenticateAdmin from '../middleware/authenticateAdmin';
const router = express.Router();

/**
 * @swagger
 * /topics/{id}:
 *   get:
 *     summary: Get a specific topic by ID
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the topic to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Topic retrieved successfully
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Server error
 */
router.get('/:id',
    validate,
    LessonsController.createLesson
);

export default router;
