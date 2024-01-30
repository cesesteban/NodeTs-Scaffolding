import { Connect, Query } from '../config/mysql';
import { Connection } from 'mysql';
import { MESSAGE_CLOSE_CONNECTION, MESSAGE_CREATE_USER, MESSAGE_DELETE_USER, MESSAGE_FIND_ALL_USERS, MESSAGE_FIND_USER, MESSAGE_UPDATE_USER, NAMESPACE_USER_REPOSITORY } from '../commons/statics';
import logging from '../config/logging';
import IUser from '../interfaces/user.interfaces/IUser';

const findAll = async (): Promise<Array<IUser>> => {
    const connection: Connection = await Connect();
    const query = `SELECT user_id, username, first_name, last_name, email, r.role, c.country FROM users as u JOIN countries as c ON c.country_id = u.country_id JOIN roles as r ON r.role_id = u.role_id WHERE is_active = 1`;
    try {
        const result: Array<IUser> = await Query(connection, query);
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_FIND_ALL_USERS, result);
        return result;
    } catch (error) {
        throw error;
    } finally {
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_CLOSE_CONNECTION);
        if (connection) {
            connection.end();
        }
    }
};

const findById = async (id: string | number): Promise<Array<IUser>> => {
    const connection: Connection = await Connect();
    const query = `SELECT user_id, username, first_name, last_name, email, r.role, c.country FROM users as u JOIN countries as c ON c.country_id = u.country_id JOIN roles as r ON r.role_id = u.role_id WHERE is_active = 1 AND user_id = "${id}"`;

    console.log('query');
    console.log(query);
    try {
        const result: Array<IUser> = await Query(connection, query);
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_FIND_USER, result);
        return result;
    } catch (error) {
        throw error;
    } finally {
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_CLOSE_CONNECTION);
        if (connection) {
            connection.end();
        }
    }
};

const findByUsername = async (username: string): Promise<Array<IUser>> => {
    const connection: Connection = await Connect();
    const query = `SELECT user_id, username, first_name, last_name, email, password, r.role, c.country FROM users as u JOIN countries as c ON c.country_id = u.country_id JOIN roles as r ON r.role_id = u.role_id WHERE is_active = 1 AND username = "${username}"`;
    try {
        const result: Array<IUser> = await Query(connection, query);
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_FIND_USER, result);
        return result;
    } catch (error) {
        throw error;
    } finally {
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_CLOSE_CONNECTION);
        if (connection) {
            connection.end();
        }
    }
};

const updatePasswordByUsername = async (username: string, password: string): Promise<IUser> => {
    const connection: Connection = await Connect();
    const query = `UPDATE users WHERE username = "${username}" SET password = "${password}`;
    try {
        const result: IUser = await Query(connection, query);
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_UPDATE_USER, result);
        return result;
    } catch (error) {
        throw error;
    } finally {
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_CLOSE_CONNECTION);
        if (connection) {
            connection.end();
        }
    }
};

const insert = async (username: string, firstName: string, lastName: string, email: string, countryId: number, roleId: number, password: string): Promise<IUser> => {
    const connection: Connection = await Connect();
    const query = `INSERT INTO users (username, password, first_name, last_name, email, role_id, country_id) VALUES ("${username}", "${password}", "${firstName}", "${lastName}", "${email}", ${roleId}, ${countryId})`;
    try {
        const result: IUser = await Query(connection, query);
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_CREATE_USER, result);
        return result;
    } catch (error) {
        throw error;
    } finally {
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_CLOSE_CONNECTION);
        if (connection) {
            connection.end();
        }
    }
};

const update = async (id: string, username: string, firstName: string, lastName: string, email: string, countryId: number, roleId: number): Promise<IUser> => {
    const connection: Connection = await Connect();
    const query = `UPDATE users SET username = "${username}", first_name = "${firstName}", last_name = "${lastName}", email = "${email}", country_id = ${countryId}, role_id = ${roleId} WHERE user_id = ${id}`;
    try {
        const result: IUser = await Query(connection, query);
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_UPDATE_USER, result);
        return result;
    } catch (error) {
        throw error;
    } finally {
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_CLOSE_CONNECTION);
        if (connection) {
            connection.end();
        }
    }
};

const destroy = async (id: string): Promise<void> => {
    const connection: Connection = await Connect();
    const query = `UPDATE users SET is_active = 0 WHERE user_id = ${id}`;
    try {
        await Query(connection, query);
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_DELETE_USER);
    } catch (error) {
        throw error;
    } finally {
        logging.info(NAMESPACE_USER_REPOSITORY, MESSAGE_CLOSE_CONNECTION);
        if (connection) {
            connection.end();
        }
    }
};

export default { findAll, findById, findByUsername, updatePasswordByUsername, insert, update, destroy };
