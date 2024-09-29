import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import generateToken from '../config/generateToken';
import { AuthRequest } from '../middleware/authenticateToken';
import { adminRoles, generateSixDigitCode } from '../config/utils';
import { sendEmail } from '../config/sendEmail';

class UsersController {
  public static getAdmins(req: AuthRequest, res: Response) {
  }

}

export default UsersController;
