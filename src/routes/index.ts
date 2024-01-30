import express, { Router, Request, Response, NextFunction } from 'express';
import authController from '../controllers/auth.controller';
import userController from '../controllers/user.controller';

const router: Router = express.Router();

router.use('/auth', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    authController(req, res, next);
});

router.use('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    userController(req, res, next);
});

export default router;
