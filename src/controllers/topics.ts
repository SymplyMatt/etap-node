import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticateToken';
import Topic from '../models/Topic';
import Subject from '../models/Subject'; 

class TopicsController {
    public static async createTopic(req: AuthRequest, res: Response) {
        const topicData = {
            ...req.body,
            createdBy: req.id,
        };

        try {
            const topic = await Topic.create(topicData);
            return res.status(201).json({
                message: 'Topic created successfully',
                topic,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to create topic',
                error: error.message,
            });
        }
    }

    public static async modifyTopic(req: AuthRequest, res: Response) {
        const { id } = req.body;
        const updatedData = req.body;

        try {
            const [updated] = await Topic.update(updatedData, {
                where: { id },
            });

            if (updated) {
                const updatedTopic = await Topic.findByPk(id, {
                    include: { model: Subject, as: 'subjectDetails' }, 
                });
                return res.status(200).json({
                    message: 'Topic updated successfully',
                    topic: updatedTopic,
                });
            }

            return res.status(404).json({ message: 'Topic not found' });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to update topic',
                error: error.message,
            });
        }
    }

    public static async getTopic(req: AuthRequest, res: Response) {
        const { id } = req.params;

        try {
            const topic = await Topic.findByPk(id, {
                include: { model: Subject, as: 'subjectDetails' }, 
            });
            if (topic) {
                return res.status(200).json({
                    message: 'Topic retrieved successfully',
                    topic,
                });
            }

            return res.status(404).json({ message: 'Topic not found' });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to retrieve topic',
                error: error.message,
            });
        }
    }

    public static async getTopics(req: AuthRequest, res: Response) {
        try {
            const topics = await Topic.findAll({
                include: { model: Subject, as: 'subjectDetails' }, 
            });
            return res.status(200).json({
                message: 'Topics retrieved successfully',
                topics,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to retrieve topics',
                error: error.message,
            });
        }
    }
}

export default TopicsController;
