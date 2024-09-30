import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticateToken';
import Student from '../models/Student';
import Admin from '../models/Admin';
import generateToken from '../config/generateToken';

class SubjectsController {
    public static async createSubject(req: AuthRequest, res: Response) {
    }
}

export default SubjectsController;
