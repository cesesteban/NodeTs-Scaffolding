"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_RUNNING_MESSAGE = exports.NOT_FOUND = exports.ID_PARAMETER = exports.ROLE_ADMIN = exports.MESSAGE_DELETE_USER = exports.MESSAGE_CREATE_USER = exports.MESSAGE_UPDATE_USER = exports.MESSAGE_PASSWORD_NOT_FOUND = exports.MESSAGE_USER_UNAVAILABLE = exports.MESSAGE_USER_NOT_FOUND = exports.MESSAGE_CHANGE_PASSWORD_USER = exports.MESSAGE_REFRESH_TOKEN = exports.MESSAGE_LOGIN_USER = exports.NAMESPACE_AUTH_SERVICE = exports.VALUE = exports.ERROR_VALUE = exports.MESSAGE_INTERNAL_ERROR = exports.MESSAGE_CLOSE_CONNECTION = exports.MESSAGE_FIND_USER = exports.MESSAGE_FIND_ALL_USERS = exports.MESSAGE_GETTING_USER = exports.MESSAGE_GETTING_ALL_USERS = exports.MESSAGE_FIND_ALL_BOOKS = exports.MESSAGE_GETTING_BOOKS = exports.MESSAGE_BOOK_CREATED = exports.MESSAGE_DELETING_USER = exports.MESSAGE_UPDATING_USER = exports.MESSAGE_INSERTING_USER = exports.MESSAGE_CREATE_BOOK = exports.NAMESPACE_USER_REPOSITORY = exports.NAMESPACE_BOOK_REPOSITORY = exports.NAMESPACE_BOOK_SERVICE = exports.NAMESPACE_USER_SERVICE = exports.NAMESPACE_API_SERVER = exports.STATUS_CODE = void 0;
exports.STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    SERVICE_UNAVAILABLE: 501
};
exports.NAMESPACE_API_SERVER = 'API';
exports.NAMESPACE_USER_SERVICE = 'User Service';
exports.NAMESPACE_BOOK_SERVICE = 'Book Service';
exports.NAMESPACE_BOOK_REPOSITORY = 'Book Repository';
exports.NAMESPACE_USER_REPOSITORY = 'User Repository';
exports.MESSAGE_CREATE_BOOK = 'Inserting books';
exports.MESSAGE_INSERTING_USER = 'Inserting user';
exports.MESSAGE_UPDATING_USER = 'Updating user';
exports.MESSAGE_DELETING_USER = 'Deleting user';
exports.MESSAGE_BOOK_CREATED = 'Book created: ';
exports.MESSAGE_GETTING_BOOKS = 'Getting all books.';
exports.MESSAGE_FIND_ALL_BOOKS = 'Retrieved books: ';
exports.MESSAGE_GETTING_ALL_USERS = 'Getting all users: ';
exports.MESSAGE_GETTING_USER = 'Getting user: ';
exports.MESSAGE_FIND_ALL_USERS = 'Retrieved users: ';
exports.MESSAGE_FIND_USER = 'Retrieved user: ';
exports.MESSAGE_CLOSE_CONNECTION = 'Closing connection.';
exports.MESSAGE_INTERNAL_ERROR = 'Internal Server Error';
exports.ERROR_VALUE = 'ERROR: ';
exports.VALUE = '';
exports.NAMESPACE_AUTH_SERVICE = 'Auth Service';
exports.MESSAGE_LOGIN_USER = 'Try login user';
exports.MESSAGE_REFRESH_TOKEN = 'Try refresh token';
exports.MESSAGE_CHANGE_PASSWORD_USER = 'Try change password user';
exports.MESSAGE_USER_NOT_FOUND = 'User not found';
exports.MESSAGE_USER_UNAVAILABLE = 'Username already in use';
exports.MESSAGE_PASSWORD_NOT_FOUND = 'Password not found';
exports.MESSAGE_UPDATE_USER = 'User update successfully';
exports.MESSAGE_CREATE_USER = 'User create successfully';
exports.MESSAGE_DELETE_USER = 'User delete successfully';
exports.ROLE_ADMIN = 'admin';
exports.ID_PARAMETER = '/:id([0-9]+)';
exports.NOT_FOUND = 'Not found';
exports.SERVER_RUNNING_MESSAGE = 'Server is running on PORT:';
