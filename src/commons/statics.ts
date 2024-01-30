export const STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    SERVICE_UNAVAILABLE: 501
};

export const NAMESPACE_API_SERVER: string = 'API';

export const NAMESPACE_USER_SERVICE: string = 'User Service';

export const NAMESPACE_BOOK_SERVICE: string = 'Book Service';

export const NAMESPACE_BOOK_REPOSITORY: string = 'Book Repository';

export const NAMESPACE_USER_REPOSITORY: string = 'User Repository';

export const MESSAGE_CREATE_BOOK: string = 'Inserting books';

export const MESSAGE_INSERTING_USER: string = 'Inserting user';

export const MESSAGE_UPDATING_USER: string = 'Updating user';

export const MESSAGE_DELETING_USER: string = 'Deleting user';

export const MESSAGE_BOOK_CREATED: string = 'Book created: ';

export const MESSAGE_GETTING_BOOKS: string = 'Getting all books.';

export const MESSAGE_FIND_ALL_BOOKS: string = 'Retrieved books: ';

export const MESSAGE_GETTING_ALL_USERS: string = 'Getting all users: ';

export const MESSAGE_GETTING_USER: string = 'Getting user: ';

export const MESSAGE_FIND_ALL_USERS: string = 'Retrieved users: ';

export const MESSAGE_FIND_USER: string = 'Retrieved user: ';

export const MESSAGE_CLOSE_CONNECTION: string = 'Closing connection.';

export const MESSAGE_INTERNAL_ERROR: string = 'Internal Server Error';

export const ERROR_VALUE: string = 'ERROR: ';

export const VALUE: string = '';

export const NAMESPACE_AUTH_SERVICE: string = 'Auth Service';

export const MESSAGE_LOGIN_USER: string = 'Try login user';

export const MESSAGE_REFRESH_TOKEN: string = 'Try refresh token';

export const MESSAGE_CHANGE_PASSWORD_USER: string = 'Try change password user';

export const MESSAGE_USER_NOT_FOUND: string = 'User not found';

export const MESSAGE_USER_UNAVAILABLE: string = 'Username already in use';

export const MESSAGE_PASSWORD_NOT_FOUND: string = 'Password not found';

export const MESSAGE_UPDATE_USER: string = 'User update successfully';

export const MESSAGE_CREATE_USER: string = 'User create successfully';

export const MESSAGE_DELETE_USER: string = 'User delete successfully';

export const ROLE_ADMIN: string = 'admin';

export const ID_PARAMETER = '/:id([0-9]+)';

export const NOT_FOUND: string = 'Not found';

export const SERVER_RUNNING_MESSAGE: string = 'Server is running on PORT:';
