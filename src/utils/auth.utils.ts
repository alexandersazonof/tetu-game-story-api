import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { UserDto } from '../dto/user.dto';
import { RequestWithUser } from '../dto/request.dto';

const secretKey = process.env.SECRET_KEY || 'secret';

export const authenticateJWT = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const modifiedReq = req as RequestWithUser;

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).send({
          message: 'Forbidden'
        });
      }

      modifiedReq.user = user as UserDto;
      next();
    });
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    });
  }
};
