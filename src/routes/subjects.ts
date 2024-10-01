import express from 'express';
import validate from '../middleware/validate';
import { body, param, query } from 'express-validator';
import SubjectsController from '../controllers/subjects';
import { adminRoles } from '../config/utils';
import authenticateToken from '../middleware/authenticateToken';
import authenticateAdmin from '../middleware/authenticateAdmin';

const router = express.Router();

/**
 * @swagger
 * /subjects/create:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mathematics
 *                 description: Name of the subject (must be unique)
 *               banner:
 *                 type: string
 *                 example: https://example.com/banner.jpg
 *                 description: URL of the subject banner (optional)
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post(
    '/create',   
    authenticateToken,
    authenticateAdmin, 
    body('name')
        .notEmpty().withMessage('Subject name is required')
        .isString().withMessage('Subject name must be a string')
        .isLength({ max: 255 }).withMessage('Subject name must not exceed 255 characters'),
    body('banner')
        .optional()
        .isURL().withMessage('Banner must be a valid URL'),
    validate,
    SubjectsController.createSubject
);

/**
 * @swagger
 * /subjects/modify:
 *   put:
 *     summary: Modify an existing subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 9145060b-c206-430b-a26b-cd5af4a6b832
 *                 description: ID of the subject to modify
 *               name:
 *                 type: string
 *                 example: Mathematics
 *                 description: New name of the subject (optional)
 *               banner:
 *                 type: string
 *                 example: https://example.com/new-banner.jpg
 *                 description: New URL of the subject banner (optional)
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       404:
 *         description: Subject not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put(
    '/modify',  
    authenticateToken,
    authenticateAdmin,  
    body('id').isUUID().withMessage('Invalid subject ID'),  
    body('name')
        .optional()
        .isString().withMessage('Subject name must be a string')
        .isLength({ max: 255 }).withMessage('Subject name must not exceed 255 characters'),
    body('banner')
        .optional()
        .isURL().withMessage('Banner must be a valid URL'),
    validate,
    SubjectsController.modifySubject
);


/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subject to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject retrieved successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Server error
 */
router.get(
    '/:id',    
    param('id').isUUID().withMessage('Invalid subject ID'),
    validate,
    SubjectsController.getSubject
);

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Get all subjects with pagination
 *     tags: [Subjects]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number to retrieve (default is 1)
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of subjects to return per page (default is 10)
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Subjects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subjects retrieved successfully
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 subjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Mathematics
 *                       description:
 *                         type: string
 *                         example: Study of numbers and shapes
 *       500:
 *         description: Server error
 */
router.get(
    '/',
    validate,
    SubjectsController.getSubjects
);
export default router;
