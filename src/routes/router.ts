import { Router } from 'express';
import swagger from './swagger'
const router = Router();

router.use('/', swagger);

export default router;
