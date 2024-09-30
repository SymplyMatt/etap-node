import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticateToken';
import Subject from '../models/Subject';
class SubjectsController {
    public static async createSubject(req: AuthRequest, res: Response) {
        const subjectData = {
            ...req.body,
            createdBy: req.id,
        };

        try {
            const subject = await Subject.create(subjectData);
            return res.status(201).json({
                message: 'Subject created successfully',
                subject,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to create subject',
                error: error.message,
            });
        }
    }

    public static async modifySubject(req: AuthRequest, res: Response) {
        const { id } = req.body;
        const updatedData = req.body;

        try {
            const [updated] = await Subject.update(updatedData, {
                where: { id },
            });

            if (updated) {
                const updatedSubject = await Subject.findByPk(id);
                return res.status(200).json({
                    message: 'Subject updated successfully',
                    subject: updatedSubject,
                });
            }

            return res.status(404).json({ message: 'Subject not found' });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to update subject',
                error: error.message,
            });
        }
    }

    public static async getSubject(req: AuthRequest, res: Response) {
        const { id } = req.params;

        try {
            const subject = await Subject.findByPk(id);
            if (subject) {
                return res.status(200).json({
                    message: 'Subject retrieved successfully',
                    subject,
                });
            }

            return res.status(404).json({ message: 'Subject not found' });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to retrieve subject',
                error: error.message,
            });
        }
    }

    public static async getSubjects(req: AuthRequest, res: Response) {
        try {
            const subjects = await Subject.findAll();
            return res.status(200).json({
                message: 'Subjects retrieved successfully',
                subjects,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to retrieve subjects',
                error: error.message,
            });
        }
    }
}

export default SubjectsController;
