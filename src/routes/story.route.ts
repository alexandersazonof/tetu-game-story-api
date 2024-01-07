import { Router } from 'express';
import StoryController from '../controllers/story.controller';
import { authenticateJWT } from '../utils/auth.utils';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * /api/stories:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Stories
 *     summary: Get all stories
 *     description: Returns a list of all stories with pages and answers
 *     responses:
 *       200:
 *         description: List of stories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *       500:
 *         description: Server error
 */
router.get('/stories', authenticateJWT, StoryController.getAllStories);

/**
 * @swagger
 * /api/stories:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Stories
 *     summary: Add a new story
 *     description: Creates a new story with data from the request body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Story'
 *     responses:
 *       201:
 *         description: Story successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/stories', authenticateJWT, StoryController.addStory);

export default router;
