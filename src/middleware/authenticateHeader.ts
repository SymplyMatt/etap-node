import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from './authenticateToken';


const authenticateHeader = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ error: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.email = (decoded as any).email;
        req.id = (decoded as any).id;
        req.role = (decoded as any).role;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

export default authenticateHeader;
