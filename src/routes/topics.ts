import express from 'express';
import validate from '../middleware/validate';
import { body, param, query } from 'express-validator';
import TopicsController from '../controllers/topics';
import authenticateToken from '../middleware/authenticateToken';
import authenticateAdmin from '../middleware/authenticateAdmin';
const router = express.Router();

const createTopicValidation = [
    body('subject')
        .isUUID()
        .withMessage('Subject must be a valid UUID'),
    body('name')
        .isString()
        .withMessage('Name is required')
        .isLength({ max: 255 })
        .withMessage('Name must be less than 255 characters'),
    body('description')
        .isString()
        .withMessage('Description is required'),
    body('banner')
        .optional()
        .isString()
        .withMessage('Banner must be a string'),
    body('video')
        .optional()
        .isString()
        .withMessage('Video must be a string'),
    body('duration')
        .isInt()
        .withMessage('Duration must be an integer'),
];

const modifyTopicValidation = [
    ...createTopicValidation, 
];

const getTopicValidation = [
    param('id')
        .isUUID()
        .withMessage('Topic ID must be a valid UUID'),
];

const getTopicsValidation = [
    query('page')
        .optional()
        .isInt()
        .withMessage('Page must be an integer'),
    query('limit')
        .optional()
        .isInt()
        .withMessage('Limit must be an integer'),
];

/**
 * @swagger
 * /topics/create:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 format: uuid
 *                 example: 0f3d0fb1-f977-4f62-a5b2-e11c83c03ec9
 *                 description: Subject ID as UUID
 *               name:
 *                 type: string
 *                 example: New Topic
 *                 description: Name of the topic
 *               description:
 *                 type: string
 *                 example: This is a description of the topic.
 *                 description: Description of the topic
 *               banner:
 *                 type: string
 *                 example: https://res.cloudinary.com/dj2ovlhjc/image/upload/v1727796239/download_2_rambdf.jpg
 *                 description: Optional banner image URL
 *               video:
 *                 type: string
 *                 example: https://res.cloudinary.com/dj2ovlhjc/video/upload/v1727796354/If__9_to_5_Jobs__Were_Honest_y5ddzg.mp4
 *                 description: Optional video URL
 *               duration:
 *                 type: integer
 *                 example: 199
 *                 description: Duration of the topic in minutes
 *     responses:
 *       201:
 *         description: Topic created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/create',
    authenticateToken,
    authenticateAdmin,
    [
        body('subject')
            .isUUID()
            .withMessage('Subject must be a valid UUID'),
        body('name')
            .isString()
            .withMessage('Name is required')
            .isLength({ max: 255 })
            .withMessage('Name must be less than 255 characters'),
        body('description')
            .isString()
            .withMessage('Description is required'),
        body('banner')
            .optional()
            .isString()
            .withMessage('Banner must be a string'),
        body('video')
            .optional()
            .isString()
            .withMessage('Video must be a string'),
        body('duration')
            .isInt()
            .withMessage('Duration must be an integer'),
    ],
    validate,
    TopicsController.createTopic
);

/**
 * @swagger
 * /topics/modify:
 *   put:
 *     summary: Modify an existing topic
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *                 description: ID of the topic to modify
 *               subject:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *                 description: Subject ID as UUID
 *               name:
 *                 type: string
 *                 example: Updated Topic
 *                 description: Name of the topic
 *               description:
 *                 type: string
 *                 example: This is an updated description of the topic.
 *                 description: Updated description of the topic
 *               banner:
 *                 type: string
 *                 example: https://res.cloudinary.com/dj2ovlhjc/image/upload/v1727797297/download_pppqhc.png
 *                 description: Optional updated banner image URL
 *               video:
 *                 type: string
 *                 example: https://res.cloudinary.com/dj2ovlhjc/video/upload/v1727796354/If__9_to_5_Jobs__Were_Honest_y5ddzg.mp4
 *                 description: Optional updated video URL
 *               duration:
 *                 type: integer
 *                 example: 199
 *                 description: Updated duration of the topic in minutes
 *     responses:
 *       200:
 *         description: Topic modified successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Server error
 */
router.put('/modify',
    authenticateToken,
    authenticateAdmin,
    [
        body('id')
            .isString()
            .withMessage('Topic ID must be a valid UUID'),
        ...modifyTopicValidation
    ],
    validate,
    TopicsController.modifyTopic
);


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
    getTopicValidation,
    validate,
    TopicsController.getTopic
);

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topics]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of topics per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of topics retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/',
    getTopicsValidation,
    validate,
    TopicsController.getTopics
);

export default router;
