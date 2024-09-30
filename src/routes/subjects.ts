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
 * /subjects/modify/{id}:
 *   put:
 *     summary: Modify an existing subject
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subject to modify
 *         schema:
 *           type: string
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
    '/modify/:id',  
    authenticateToken,
    authenticateAdmin,  
    param('id').isUUID().withMessage('Invalid subject ID'),
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
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Subjects retrieved successfully
 *       500:
 *         description: Server error
 */
router.get(
    '/',    
    validate,
    SubjectsController.getSubjects
);

export default router;
