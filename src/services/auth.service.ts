import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
    ERROR_VALUE,
    MESSAGE_CHANGE_PASSWORD_USER,
    MESSAGE_LOGIN_USER,
    MESSAGE_PASSWORD_NOT_FOUND,
    MESSAGE_UPDATE_USER,
    MESSAGE_USER_NOT_FOUND,
    NAMESPACE_AUTH_SERVICE,
    STATUS_CODE
} from '../commons/statics';
import logging from '../config/logging';
import config from '../config/config';
import IResponseChangePassword from '../interfaces/auth.interfaces/IResponseChangePassword';
import IResponseAuthLogin from '../interfaces/auth.interfaces/IResponseAuthLogin';
import IUser from '../interfaces/user.interfaces/IUser';
import repository from '../repositories/user.repository';
import IRequestAuthLogin from '../interfaces/auth.interfaces/IRequestAuthLogin';
import IRequestChangePassword from '../interfaces/auth.interfaces/IRequestChangePassword';
import IRequestRefreshToken from '../interfaces/auth.interfaces/IRequestRefreshToken';
import toCamelCase from '../middlewares/validation.request.middleware';

const loginUser = async (req: IRequestAuthLogin): Promise<IResponseAuthLogin> => {
    try {
        logging.info(NAMESPACE_AUTH_SERVICE, MESSAGE_LOGIN_USER);
        let user: Array<IUser> = await repository.findByUsername(req.username);

        if (user.length < 1) {
            return { result: MESSAGE_USER_NOT_FOUND, status: STATUS_CODE.NOT_FOUND };
        }

        if (!checkIfUnencryptedPasswordIsValid(req.password, user[0].password)) {
            return { result: MESSAGE_PASSWORD_NOT_FOUND, status: STATUS_CODE.BAD_REQUEST };
        }

        //Sing JWT
        const token = setToken(toCamelCase(user[0]));

        return { result: token, status: STATUS_CODE.OK };
    } catch (error) {
        logging.error(NAMESPACE_AUTH_SERVICE, error.message, error);
        return { result: `${ERROR_VALUE}${error.message}`, status: STATUS_CODE.INTERNAL_ERROR };
    }
};

const getUserData = (token: string): IUser => {
    const decodedToken: jwt.JwtPayload = <jwt.JwtPayload>jwt.decode(token);
    return { userId: decodedToken.userId, username: decodedToken.username } as IUser;
};

const generateRefreshToken = async (req: IRequestRefreshToken): Promise<IResponseAuthLogin> => {
    try {
        logging.info(NAMESPACE_AUTH_SERVICE, MESSAGE_LOGIN_USER);

        const userData: IUser = getUserData(req.auth);

        let user: Array<IUser> = await repository.findById(userData.userId);

        if (user.length < 1) {
            return { result: MESSAGE_USER_NOT_FOUND, status: STATUS_CODE.NOT_FOUND };
        }

        if (user[0].username != userData.username) {
            return { result: MESSAGE_USER_NOT_FOUND, status: STATUS_CODE.NOT_FOUND };
        }

        //Sing JWT
        const token = setRefreshToken(toCamelCase(user[0]));

        return { result: token, status: STATUS_CODE.OK };
    } catch (error) {
        logging.error(NAMESPACE_AUTH_SERVICE, error.message, error);
        return { result: `${ERROR_VALUE}${error.message}`, status: STATUS_CODE.INTERNAL_ERROR };
    }
};

const changePasswordUser = async (id: string, req: IRequestChangePassword): Promise<IResponseChangePassword> => {
    try {
        logging.info(NAMESPACE_AUTH_SERVICE, MESSAGE_CHANGE_PASSWORD_USER);

        let user: Array<IUser> = await repository.findById(id);

        const userExist: boolean = await validateUserById(id, user);
        if (!userExist) {
            return { result: MESSAGE_USER_NOT_FOUND, status: STATUS_CODE.NOT_FOUND };
        }

        if (!checkIfUnencryptedPasswordIsValid(req.oldPassword, user[0].password)) {
            return { result: MESSAGE_PASSWORD_NOT_FOUND, status: STATUS_CODE.BAD_REQUEST };
        }

        const passwordEncrypted: string = hashPassword(req.newPassword);

        await repository.updatePasswordByUsername(user[0].username, passwordEncrypted);

        return { result: MESSAGE_UPDATE_USER, status: STATUS_CODE.OK };
    } catch (error) {
        logging.error(NAMESPACE_AUTH_SERVICE, error.message, error);
        return { result: `${ERROR_VALUE}${error.message}`, status: STATUS_CODE.INTERNAL_ERROR };
    }
};

const setRefreshToken = (user: IUser): string => {
    return jwt.sign({ userId: user.userId, username: user.username }, config.jwtSecret.refresh as string, { expiresIn: config.jwtSecret.expires });
};

const setToken = (user: IUser): string => {
    return jwt.sign({ userId: user.userId, username: user.username }, config.jwtSecret.secret as string, { expiresIn: config.jwtSecret.expires });
};

export const validateUserById = async (id: string, user: Array<IUser>): Promise<boolean> => {
    if (user.length < 1) {
        return false;
    } else {
        return true;
    }
};

const checkIfUnencryptedPasswordIsValid = (unencryptedPassword: string, password: string): boolean => {
    const passwordEncrypted: string = hashPassword(unencryptedPassword);
    return bcrypt.compareSync(unencryptedPassword, passwordEncrypted);
};

export const hashPassword = (unencryptedPassword: string): string => {
    return bcrypt.hashSync(unencryptedPassword, 8);
};

export default { loginUser, changePasswordUser, generateRefreshToken };
