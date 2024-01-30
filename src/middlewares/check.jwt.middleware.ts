import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { STATUS_CODE } from '../commons/statics';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head

    const token: string = <string>req.headers[config.jwtSecret.headers as string];
    let jwtPayload: jwt.JwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = <jwt.JwtPayload>jwt.verify(token, config.jwtSecret.secret as string);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(STATUS_CODE.UNAUTHORIZED).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const username: string = jwtPayload.username;

    const newToken: string = jwt.sign({ username }, config.jwtSecret.secret as string, {
        expiresIn: config.jwtSecret.expires
    });

    res.setHeader(config.jwtSecret.header as string, newToken);

    //Call the next middleware or controller
    next();
};
