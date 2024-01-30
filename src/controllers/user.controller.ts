import express, { Router, Response, Request } from 'express';
import { ID_PARAMETER, ROLE_ADMIN } from '../commons/statics';
import { checkJwt } from '../middlewares/check.jwt.middleware';
import { checkRole } from '../middlewares/check.role.middleware';
import userService from '../services/user.service';
import { validationRequest } from '../middlewares/validation.request.middleware';
import IRequestUpdateUser from '../interfaces/user.interfaces/IRequestUpdateUser';
import IRequestCreateUser from '../interfaces/user.interfaces/IRequesCreateUser';

const router: Router = express.Router();

router.get('/', [checkJwt, checkRole([ROLE_ADMIN])], async (req: Request, res: Response): Promise<void> => {
    const response = await userService.findAll();
    res.status(response.status).json({ result: response.result });
});

router.get(ID_PARAMETER, [checkJwt, checkRole([ROLE_ADMIN])], async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const response = await userService.findById(id);
    res.status(response.status).json({ result: response.result });
});

router.post('/', [checkJwt, checkRole([ROLE_ADMIN]), validationRequest(IRequestCreateUser)], async (req: Request, res: Response): Promise<void> => {
    const request = req.body as IRequestCreateUser;
    const response = await userService.createUser(request);
    res.status(response.status).json({ result: response.result });
});

router.patch(ID_PARAMETER, [checkJwt, checkRole([ROLE_ADMIN]), validationRequest(IRequestUpdateUser)], async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const request = req.body as IRequestUpdateUser;
    const response = await userService.updateUser(id, request);
    res.status(response.status).json({ result: response.result });
});

router.delete(ID_PARAMETER, [checkJwt, checkRole([ROLE_ADMIN])], async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const response = await userService.deleteUser(id);
    res.status(response.status).json({ result: response.result });
});

export default router;
