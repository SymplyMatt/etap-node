import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from './authenticateToken';
import { adminRoles } from '../config/utils';

const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user_role = req.role || '';
  try {
      if (!adminRoles.includes(user_role)) {
        return res.sendStatus(401);
      }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export default authenticateAdmin;
