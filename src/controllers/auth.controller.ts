import express, { Router, Request, Response } from 'express';
import { checkJwt } from '../middlewares/check.jwt.middleware';
import { validationRequest } from '../middlewares/validation.request.middleware';
import IRequestAuthLogin from '../interfaces/auth.interfaces/IRequestAuthLogin';
import IRequestChangePassword from '../interfaces/auth.interfaces/IRequestChangePassword';
import authService from '../services/auth.service';
import IRequestRefreshToken from '../interfaces/auth.interfaces/IRequestRefreshToken';
import { validationHeaders } from '../middlewares/validation.headers.middleware';

const router: Router = express.Router();

router.post('/login', validationRequest(IRequestAuthLogin), async (req: Request, res: Response): Promise<void> => {
    const request = req.body as IRequestAuthLogin;
    const response = await authService.loginUser(request);
    res.status(response.status).json({ result: response.result });
});

router.post('/refresh', validationHeaders(IRequestRefreshToken), async (req: Request, res: Response): Promise<void> => {
    const request = req.headers as unknown as IRequestRefreshToken;
    const response = await authService.generateRefreshToken(request);
    res.status(response.status).json({ result: response.result });
});

router.post('/change-password', [checkJwt, validationRequest(IRequestChangePassword)], async (req: Request, res: Response): Promise<void> => {
    //Get ID from JWT
    const id: string = res.locals.jwtPayload.userId;
    const request = req.body as IRequestChangePassword;
    const response = await authService.changePasswordUser(id, request);
    res.status(response.status).json({ result: response.result });
});

export default router;
