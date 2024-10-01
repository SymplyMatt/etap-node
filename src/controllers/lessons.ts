import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticateToken';
import UserLesson from '../models/UserLesson'; 
import Topic from '../models/Topic'; 
import Student from '../models/Student'; 
import Subject from '../models/Subject'; 

interface LessonDetails {
    topicId: string;
    progress: number;
    status: 'completed' | 'in-progress' | null;
    createdAt: Date | null ;
    completedAt: Date | null;
    duration: number;
}

interface StudentLessons {
    studentId: string;
    studentName: string;
    studentEmail: string;
    lessons: LessonDetails[];
}
class LessonsController {
    public static async startLesson(req: AuthRequest, res: Response) {
        const { topicId } = req.body;
        const studentId = req.id; 
        try {
            const topic = await Topic.findByPk(topicId);
            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }
            const existingLesson = await UserLesson.findOne({
                where: {
                    student: studentId,
                    topic: topicId,
                    subject: topic.subject
                }
            });
            if (existingLesson) {
                return res.status(400).json({ message: 'Lesson already exists' });
            }
            const userLesson = await UserLesson.create({
                student: studentId,
                topic: topicId,
                subject: topic.subject,
                progress: 0, 
                video: topic.video, 
                status: 'in-progress', 
            });
    
            return res.status(201).json({ message: 'Lesson started successfully', userLesson });
        } catch (error) {
            return res.status(500).json({ message: 'Error starting lesson', error });
        }
    }    
    
    public static async updateLessonProgress(req: AuthRequest, res: Response) {
        const { lessonId, progress } = req.body;
        const studentId = req.id;
        try {
            const userLesson = await UserLesson.findOne({ where: { id: lessonId, student: studentId } });
            if (!userLesson) {
                return res.status(404).json({ message: 'Lesson not found or does not belong to this student' });
            }
            const topic = await Topic.findByPk(userLesson.topic);
            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }
            if (userLesson.video !== topic.video) {
                userLesson.progress = 0;
                userLesson.video = topic.video;
            } else {
                userLesson.progress = progress;
            }
            if (userLesson.progress >= topic.duration) {
                userLesson.status = 'completed';
                userLesson.completedAt = new Date();
            } else {
                userLesson.status = 'in-progress';
            }

            await userLesson.save();
            return res.status(200).json({ message: 'Lesson progress updated successfully', userLesson });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating lesson progress', error });
        }
    }

    public static async getUserTopicLesson(req: AuthRequest, res: Response) {
        const { topicId } = req.query;  
        const studentId = req.id;
        try {
            const userLesson = await UserLesson.findOne({
                where: { topic: topicId, student: studentId },
                include: [
                    {
                        model: Student,
                        as: 'studentDetails',
                    },
                    {
                        model: Topic,
                        as: 'topicDetails'
                    },
                ],
            });
    
            if (!userLesson) {
                return res.status(404).json({ message: 'User lesson not found for this topic' });
            }
            const topic = await Topic.findByPk(topicId as string);
            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }
            if (userLesson.video !== topic.video) {
                userLesson.progress = 0; 
                userLesson.status = 'in-progress'; 
                userLesson.video = topic.video;
                await userLesson.save();
            }
    
            return res.status(200).json(userLesson);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving user lesson', error });
        }
    }
    
    public static async getUserSubjectLessons(req: AuthRequest, res: Response) {
        const { subjectId } = req.query;  
        const studentId = req.id;
        try {
            const lessons = await UserLesson.findAll({
                where: { 
                    subject: subjectId,
                    student: studentId, 
                },
                include: [
                    {
                        model: Student,
                        as: 'studentDetails', 
                    },
                    {
                        model: Topic,
                        as: 'topicDetails', 
                    },
                ],
            });
    
            const updatedLessons = await Promise.all(
                lessons.map(async (lesson) => {
                    const topic = await Topic.findByPk(lesson.topic);
                    if (!topic) {
                        return null;
                    }
                    if (lesson.video !== topic.video) {
                        lesson.progress = 0;
                        lesson.status = 'in-progress';
                        lesson.video = topic.video;
                        lesson.completedAt = null;
                        await lesson.save();
                    }
                    return lesson;
                })
            );
    
            const filteredLessons = updatedLessons.filter((lesson) => lesson !== null);
            return res.status(200).json({ lessons: filteredLessons });
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving subject lessons', error });
        }
    }

    public static async getSubjectLessons(req: AuthRequest, res: Response) {
        const { subjectId } = req.query;
    
        try {
            // Fetch all topics related to the subject
            const topics = await Topic.findAll({
                where: { subject: subjectId },
            });
    
            // Fetch all students
            const students = await Student.findAll({
            });
    
            // Prepare an array to hold the results
            const results: StudentLessons[] = []; // Define the type here
    
            // Loop through each student to gather their UserLesson information for each topic
            for (const student of students) {
                const studentLessons: StudentLessons = {
                    studentId: student.id,
                    studentName: student.firstName,
                    studentEmail: student.email,
                    lessons: [],
                };
    
                for (const topic of topics) {
                    const userLesson = await UserLesson.findOne({
                        where: {
                            student: student.id,
                            topic: topic.id,
                        },
                    });
                    if (userLesson) {
                        studentLessons.lessons.push({
                            topicId: topic.id,
                            progress: userLesson.progress,
                            status: userLesson.status,
                            createdAt: userLesson.createdAt || null,
                            completedAt:userLesson.completedAt,
                            duration: topic.duration,
                        });
                    } else {
                        studentLessons.lessons.push({
                            topicId: topic.id,
                            progress: 0,
                            status: null,
                            createdAt: null,
                            completedAt:null,
                            duration: topic.duration,
                        });
                    }
                }
    
                results.push(studentLessons);
            }
    
            return res.status(200).json({results, subjectId});
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving subject lessons', error });
        }
    }
    public static async getLessons(req: AuthRequest, res: Response) {
        try {
            const lessons = await UserLesson.findAll();
    
            return res.status(200).json({lessons});
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving subject lessons', error });
        }
    }
        
}

export default LessonsController;
