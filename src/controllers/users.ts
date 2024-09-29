import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticateToken';
import Student from '../models/Student'; 
class UsersController {
  public static async createStudent(req: AuthRequest, res: Response) {
    const { firstName, lastName, email } = req.body;

    try {
      // Create a new student in the database
      const student = await Student.create({
        firstName,
        lastName,
        email,
      });

      // Return success response with the created student
      return res.status(201).json({
        message: 'Student created successfully',
        student,
      });
    } catch (error:any) {
      // Handle errors (e.g., duplicate email or validation errors)
      console.error(error);
      return res.status(500).json({
        message: 'Failed to create student',
        error: error.message,
      });
    }
  }
}

export default UsersController;
