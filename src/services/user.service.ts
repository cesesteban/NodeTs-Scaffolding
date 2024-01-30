import logging from '../config/logging';
import {
    ERROR_VALUE,
    MESSAGE_CREATE_USER,
    MESSAGE_DELETE_USER,
    MESSAGE_DELETING_USER,
    MESSAGE_GETTING_ALL_USERS,
    MESSAGE_GETTING_USER,
    MESSAGE_INSERTING_USER,
    MESSAGE_UPDATE_USER,
    MESSAGE_UPDATING_USER,
    MESSAGE_USER_NOT_FOUND,
    MESSAGE_USER_UNAVAILABLE,
    NAMESPACE_USER_SERVICE,
    STATUS_CODE
} from '../commons/statics';
import IResponseGetUsers from '../interfaces/user.interfaces/IResponseGetUsers';
import repository from '../repositories/user.repository';
import IUser from '../interfaces/user.interfaces/IUser';
import { hashPassword, validateUserById } from './auth.service';
import IResponseCreateUser from '../interfaces/user.interfaces/IResponseCreateUser';
import IRequestUpdateUser from '../interfaces/user.interfaces/IRequestUpdateUser';
import IRequestCreateUser from '../interfaces/user.interfaces/IRequesCreateUser';

const findAll = async (): Promise<IResponseGetUsers> => {
    try {
        logging.info(NAMESPACE_USER_SERVICE, MESSAGE_GETTING_ALL_USERS);
        const result = await repository.findAll();
        return { result, status: STATUS_CODE.OK };
    } catch (error) {
        logging.error(NAMESPACE_USER_SERVICE, error.message, error);
        return { result: `${ERROR_VALUE}${error.message}`, status: STATUS_CODE.INTERNAL_ERROR };
    }
};

const findById = async (id: string): Promise<IResponseGetUsers> => {
    try {
        logging.info(NAMESPACE_USER_SERVICE, MESSAGE_GETTING_USER);
        const result = await repository.findById(id);
        return { result, status: STATUS_CODE.OK };
    } catch (error) {
        logging.error(NAMESPACE_USER_SERVICE, error.message, error);
        return { result: `${ERROR_VALUE}${error.message}`, status: STATUS_CODE.INTERNAL_ERROR };
    }
};

const createUser = async (req: IRequestCreateUser): Promise<IResponseCreateUser> => {
    try {
        logging.info(NAMESPACE_USER_SERVICE, MESSAGE_INSERTING_USER);

        const isValidUsername = await validateUsername(req.username);
        if (!isValidUsername) {
            return { result: MESSAGE_USER_UNAVAILABLE, status: STATUS_CODE.BAD_REQUEST };
        }

        const encryptedPassword: string = hashPassword(req.password);
        await repository.insert(req.username, req.firstName, req.lastName, req.email, req.countryId, req.roleId, encryptedPassword);
        return { result: MESSAGE_CREATE_USER, status: STATUS_CODE.OK };
    } catch (error) {
        logging.error(NAMESPACE_USER_SERVICE, error.message, error);
        return { result: `${ERROR_VALUE}${error.message}`, status: STATUS_CODE.INTERNAL_ERROR };
    }
};

const updateUser = async (id: string, req: IRequestUpdateUser): Promise<IResponseCreateUser> => {
    try {
        logging.info(NAMESPACE_USER_SERVICE, MESSAGE_UPDATING_USER);

        let user: Array<IUser> = await repository.findById(id);
        const userExist: boolean = await validateUserById(id, user);

        if (!userExist) {
            return { result: MESSAGE_USER_NOT_FOUND, status: STATUS_CODE.NOT_FOUND };
        }

        const isValidUsername = await validateUsername(req.username);
        if (!isValidUsername) {
            return { result: MESSAGE_USER_UNAVAILABLE, status: STATUS_CODE.BAD_REQUEST };
        }

        await repository.update(id, req.username, req.firstName, req.lastName, req.email, req.countryId, req.roleId);
        return { result: MESSAGE_UPDATE_USER, status: STATUS_CODE.OK };
    } catch (error) {
        logging.error(NAMESPACE_USER_SERVICE, error.message, error);
        return { result: `${ERROR_VALUE}${error.message}`, status: STATUS_CODE.INTERNAL_ERROR };
    }
};

const deleteUser = async (id: string): Promise<IResponseCreateUser> => {
    try {
        logging.info(NAMESPACE_USER_SERVICE, MESSAGE_DELETING_USER);

        let user: Array<IUser> = await repository.findById(id);
        const userExist: boolean = await validateUserById(id, user);

        if (!userExist) {
            return { result: MESSAGE_USER_NOT_FOUND, status: STATUS_CODE.NOT_FOUND };
        }

        await repository.destroy(id);
        return { result: MESSAGE_DELETE_USER, status: STATUS_CODE.OK };
    } catch (error) {
        logging.error(NAMESPACE_USER_SERVICE, error.message, error);
        return { result: `${ERROR_VALUE}${error.message}`, status: STATUS_CODE.INTERNAL_ERROR };
    }
};

const validateUsername = async (username: string): Promise<boolean> => {
    let user: Array<IUser> = await repository.findByUsername(username);

    if (user.length < 1) {
        return true;
    } else {
        return false;
    }
};

export default { findAll, findById, createUser, updateUser, deleteUser };
