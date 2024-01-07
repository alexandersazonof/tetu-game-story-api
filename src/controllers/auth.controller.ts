import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import { Permission } from '../models/permissions.model';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'secret';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ message: 'User with username exist' });
      }

      const user = new User();
      user.username = username;
      user.password = password;
      user.permissions = [Permission.READ_ADMIN];
      await user.hashPassword();
      await user.save();

      res.status(201).json({ message: 'User created success' });
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user || !await user.checkIfUnencryptedPasswordIsValid(password)) {
        return res.status(401).send({
          message: 'Incorrect username or password'
        });
      }

      const token = jwt.sign({ userId: user.id, username: user.username, permissions: user.permissions }, secretKey, { expiresIn: '24h' });
      res.json({ token });
    } catch (e) {
      next(e);
    }
  }
}