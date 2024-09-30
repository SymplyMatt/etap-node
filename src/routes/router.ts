import { Router } from 'express';
import swagger from './swagger'
import users from './users'
import auth from './auth'
import subjects from './subjects'
const router = Router();

router.use('/auth', auth);
router.use('/subjects', subjects);
router.use('/users', users);
router.use('/', swagger);

export default router;
