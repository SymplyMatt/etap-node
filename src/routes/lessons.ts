import express from 'express';
import validate from '../middleware/validate';
import { body, param, query } from 'express-validator';
import LessonsController from '../controllers/lessons';
import authenticateToken from '../middleware/authenticateToken';
import authenticateAdmin from '../middleware/authenticateAdmin';
import authenticateStudent from '../middleware/authenticateStudent';
const router = express.Router();

/**
 * @swagger
 * /lessons/start:
 *   post:
 *     summary: Start a new lesson for the student.
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topicId:
 *                 type: string
 *                 description: ID of the topic to start the lesson.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Lesson started successfully.
 *       400:
 *         description: Validation error or missing parameters.
 */
router.post('/start', 
    authenticateToken,
    authenticateStudent,
    [
        body('topicId')
            .isUUID()
            .withMessage('Invalid topicId. It must be a valid UUID.')
    ], 
    validate, 
    LessonsController.startLesson
);

/**
 * @swagger
 * /lessons/update-progress:
 *   post:
 *     summary: Update the lesson progress for a student.
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonId:
 *                 type: string
 *                 description: ID of the lesson to update.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               progress:
 *                 type: number
 *                 description: New progress value.
 *                 example: 45
 *     responses:
 *       200:
 *         description: Progress updated successfully.
 *       400:
 *         description: Validation error or missing parameters.
 */
router.post('/update-progress', 
    authenticateToken,
    authenticateStudent,
    [
        body('lessonId')
            .isUUID()
            .withMessage('Invalid lessonId. It must be a valid UUID.'),
        body('progress')
            .isInt()
            .withMessage('Progress must be an integer')
    ], 
    validate, 
    LessonsController.updateLessonProgress
);

/**
 * @swagger
 * /lessons/get/topic:
 *   get:
 *     summary: Get the lesson for a specific topic and student.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []  # Ensures the JWT token is included in the Swagger doc
 *     parameters:
 *       - in: query
 *         name: topicId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the topic.
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's lesson for the topic.
 *       404:
 *         description: Lesson not found.
 *       400:
 *         description: Validation error or missing parameters.
 */
router.get('/get/topic', 
    authenticateToken,
    authenticateStudent,
    [
        query('topicId')
            .isUUID()
            .withMessage('Invalid topicId. It must be a valid UUID.')
    ], 
    validate, 
    LessonsController.getUserTopicLesson
);

/**
 * @swagger
 * /lessons/get/subject/user:
 *   get:
 *     summary: Get all lessons for a specific subject for the logged-in user.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []  # This line ensures that the JWT token is included in the Swagger doc
 *     parameters:
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subject to retrieve lessons for.
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Successfully retrieved lessons for the subject for the logged-in user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the user lesson.
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   progress:
 *                     type: number
 *                     description: The progress of the lesson (0 to 100).
 *                     example: 50
 *                   status:
 *                     type: string
 *                     enum: [in-progress, completed]
 *                     description: The current status of the lesson.
 *                     example: in-progress
 *                   video:
 *                     type: string
 *                     description: The video URL for the lesson.
 *                     example: "https://example.com/video.mp4"
 *                   topic:
 *                     type: string
 *                     description: The ID of the associated topic.
 *                     example: "789e4567-e89b-12d3-a456-426614174000"
 *       400:
 *         description: Validation error or missing parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the validation error.
 *                   example: "Invalid subjectId. It must be a valid UUID."
 *       401:
 *         description: Unauthorized, invalid or missing authentication token.
 *       500:
 *         description: Internal server error.
 */
router.get('/get/subject/user', 
    authenticateToken,
    [
        query('subjectId')
            .isUUID()
            .withMessage('Invalid subjectId. It must be a valid UUID.')
    ], 
    validate, 
    LessonsController.getUserSubjectLessons
);

/**
 * @swagger
 * /lessons/get/subject:
 *   get:
 *     summary: Get all lessons for a specific subject.
 *     tags: [Lessons]
 *     parameters:
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the subject.
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Successfully retrieved lessons for the subject.
 *       400:
 *         description: Validation error or missing parameters.
 */
router.get('/get/subject', 
    authenticateToken,
    [
        query('subjectId')
            .isUUID()
            .withMessage('Invalid subjectId. It must be a valid UUID.')
    ], 
    validate, 
    LessonsController.getSubjectLessons
);
router.get('/get', 
    authenticateToken,
    validate, 
    LessonsController.getLessons
);

export default router;
