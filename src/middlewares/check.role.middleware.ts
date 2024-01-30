import { Request, Response, NextFunction } from 'express';
import IUser from '../interfaces/user.interfaces/IUser';
import userRepository from '../repositories/user.repository';
import { STATUS_CODE } from '../commons/statics';

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const username: string = <string>res.locals.jwtPayload.username;

        //Get user role from the database
        let user: Array<IUser> | IUser;
        user = await userRepository.findByUsername(username);

        if (user.length < 1) {
            res.status(STATUS_CODE.NOT_FOUND).send();
        }

        //Check if array of authorized roles includes the user's role
        if (roles.includes(user[0]?.role)) next();
        else res.status(STATUS_CODE.UNAUTHORIZED).send();
    };
};
