import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticateToken';
import Student from '../models/Student';
import Admin from '../models/Admin';
import generateToken from '../config/generateToken';

class LessonsController {
    public static async createLesson(req: AuthRequest, res: Response) {
    }
    public static async updateLesson(req: AuthRequest, res: Response) {
    }
    public static async getUserLessons(req: AuthRequest, res: Response) {
    }
    public static async getLessons(req: AuthRequest, res: Response) {
    }
}

export default LessonsController;
