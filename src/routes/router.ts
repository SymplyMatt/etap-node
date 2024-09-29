import { Router } from 'express';
import swagger from './swagger'
import users from './users'
import auth from './auth'
const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/', swagger);

export default router;
