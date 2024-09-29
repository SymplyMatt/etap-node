import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticateToken';
import Student from '../models/Student';
import Admin from '../models/Admin';
import generateToken from '../config/generateToken';

class AuthController {
    public static async login(req: Request, res: Response) {
        const { firstName, email, role } = req.body;
        try {
            let user;
            if (role !== 'student') {
                user = await Admin.findOne({ where: { email, firstName } });
            } else {
                user = await Student.findOne({ where: { email, firstName } });
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = generateToken({ id: user.id, email: user.email, role: role || 'student' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                maxAge: 24 * 60 * 60 * 1000, 
            });
            return res.status(200).json({
                message: 'Login successful',
                user
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to login',
                error: error.message,
            });
        }
    }

    public static async logout(req: AuthRequest, res: Response) {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    }

    public static async getLoggedInUser(req: AuthRequest, res: Response) {
        const userId = req.id;
        try {
            const student = await Student.findByPk(userId);
            const admin = await Admin.findByPk(userId);
            const user = student || admin;
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({
                message: 'User retrieved successfully',
                user
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to retrieve user',
                error: error.message,
            });
        }
    }
}

export default AuthController;
