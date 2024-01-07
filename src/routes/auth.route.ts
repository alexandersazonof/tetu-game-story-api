import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Users
 *     description: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully registered
 *       '409':
 *         description: User already exists
 *       '500':
 *         description: Server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Users
 *     description: Authenticate a user and return a token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Incorrect username or password
 *       '500':
 *         description: Server error
 */
router.post('/login', authController.login);

export default router;
