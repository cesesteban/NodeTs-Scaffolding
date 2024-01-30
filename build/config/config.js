"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MYSQL_HOST = process.env.MYSQL_HOST;
var MYSQL_DATABASE = process.env.MYSQL_DATABASE;
var MYSQL_USER = process.env.MYSQL_USER;
var MYSQL_PASS = process.env.MYSQL_PASS;
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
var SERVER_PORT = process.env.SERVER_PORT;
var JWT_SECRET_SECRET = process.env.JWT_SECRET_SECRET;
var JWT_SECRET_HEADER = process.env.JWT_SECRET_HEADER;
var JWT_SECRET_HEADERS = process.env.JWT_SECRET_HEADERS;
var JWT_SECRET_EXPIRES = process.env.JWT_SECRET_EXPIRES;
var JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
var MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
var JWT_SECRET = {
    secret: JWT_SECRET_SECRET,
    header: JWT_SECRET_HEADER,
    headers: process.env.JWT_SECRET_HEADERS,
    expires: JWT_SECRET_EXPIRES,
    refresh: JWT_SECRET_REFRESH
};
var config = {
    mysql: MYSQL,
    server: SERVER,
    jwtSecret: JWT_SECRET
};
exports.default = config;
