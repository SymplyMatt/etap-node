import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticateToken';
import Student from '../models/Student';
import Admin from '../models/Admin';

class UsersController {
    private static async emailExists(model: any, email: string): Promise<boolean> {
        const user = await model.findOne({ where: { email } });
        return user !== null;
    }

    private static async createUser(model: any, userData: any, res: Response) {
        const { email } = userData;

        if (await UsersController.emailExists(model, email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        try {
            const user = await model.create(userData);
            return res.status(201).json({
                message: `${model.name} created successfully`,
                user,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: `Failed to create ${model.name.toLowerCase()}`,
                error: error.message,
            });
        }
    }

    public static async createStudent(req: AuthRequest, res: Response) {
        const userData = { ...req.body };
        return UsersController.createUser(Student, userData, res);
    }

    public static async createAdmin(req: AuthRequest, res: Response) {
        const userData = { ...req.body, role: req.body.role };
        return UsersController.createUser(Admin, userData, res);
    }

    public static async getStudents(req: Request, res: Response) {
        try {
            const students = await Student.findAll();
            return res.status(200).json({
                message: 'Students retrieved successfully',
                students,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to retrieve students',
                error: error.message,
            });
        }
    }

    public static async getAdmins(req: Request, res: Response) {
    try {
        const admins = await Admin.findAll();
        return res.status(200).json({
            message: 'Admins retrieved successfully',
            admins,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to retrieve admins',
            error: error.message,
        });
    }
  }
}

export default UsersController;
