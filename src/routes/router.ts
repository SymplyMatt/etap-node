import { Router } from 'express';
import swagger from './swagger'
import users from './users'
import auth from './auth'
import subjects from './subjects'
import topics from './topics'
import lessons from './lessons'
const router = Router();

router.use('/auth', auth);
router.use('/subjects', subjects);
router.use('/topics', topics);
router.use('/users', users);
router.use('/lessons', lessons);
router.use('/', swagger);

export default router;
