"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = require("../config/mysql");
var statics_1 = require("../commons/statics");
var logging_1 = __importDefault(require("../config/logging"));
var findAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, query, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mysql_1.Connect)()];
            case 1:
                connection = _a.sent();
                query = "SELECT user_id, username, first_name, last_name, email, r.role, c.country FROM users as u JOIN countries as c ON c.country_id = u.country_id JOIN roles as r ON r.role_id = u.role_id WHERE is_active = 1";
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, (0, mysql_1.Query)(connection, query)];
            case 3:
                result = _a.sent();
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_FIND_ALL_USERS, result);
                return [2 /*return*/, result];
            case 4:
                error_1 = _a.sent();
                throw error_1;
            case 5:
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_CLOSE_CONNECTION);
                if (connection) {
                    connection.end();
                }
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var findById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, query, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mysql_1.Connect)()];
            case 1:
                connection = _a.sent();
                query = "SELECT user_id, username, first_name, last_name, email, r.role, c.country FROM users as u JOIN countries as c ON c.country_id = u.country_id JOIN roles as r ON r.role_id = u.role_id WHERE is_active = 1 AND user_id = \"".concat(id, "\"");
                console.log('query');
                console.log(query);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, (0, mysql_1.Query)(connection, query)];
            case 3:
                result = _a.sent();
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_FIND_USER, result);
                return [2 /*return*/, result];
            case 4:
                error_2 = _a.sent();
                throw error_2;
            case 5:
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_CLOSE_CONNECTION);
                if (connection) {
                    connection.end();
                }
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var findByUsername = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, query, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mysql_1.Connect)()];
            case 1:
                connection = _a.sent();
                query = "SELECT user_id, username, first_name, last_name, email, password, r.role, c.country FROM users as u JOIN countries as c ON c.country_id = u.country_id JOIN roles as r ON r.role_id = u.role_id WHERE is_active = 1 AND username = \"".concat(username, "\"");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, (0, mysql_1.Query)(connection, query)];
            case 3:
                result = _a.sent();
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_FIND_USER, result);
                return [2 /*return*/, result];
            case 4:
                error_3 = _a.sent();
                throw error_3;
            case 5:
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_CLOSE_CONNECTION);
                if (connection) {
                    connection.end();
                }
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var updatePasswordByUsername = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, query, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mysql_1.Connect)()];
            case 1:
                connection = _a.sent();
                query = "UPDATE users WHERE username = \"".concat(username, "\" SET password = \"").concat(password);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, (0, mysql_1.Query)(connection, query)];
            case 3:
                result = _a.sent();
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_UPDATE_USER, result);
                return [2 /*return*/, result];
            case 4:
                error_4 = _a.sent();
                throw error_4;
            case 5:
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_CLOSE_CONNECTION);
                if (connection) {
                    connection.end();
                }
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var insert = function (username, firstName, lastName, email, countryId, roleId, password) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, query, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mysql_1.Connect)()];
            case 1:
                connection = _a.sent();
                query = "INSERT INTO users (username, password, first_name, last_name, email, role_id, country_id) VALUES (\"".concat(username, "\", \"").concat(password, "\", \"").concat(firstName, "\", \"").concat(lastName, "\", \"").concat(email, "\", ").concat(roleId, ", ").concat(countryId, ")");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, (0, mysql_1.Query)(connection, query)];
            case 3:
                result = _a.sent();
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_CREATE_USER, result);
                return [2 /*return*/, result];
            case 4:
                error_5 = _a.sent();
                throw error_5;
            case 5:
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_CLOSE_CONNECTION);
                if (connection) {
                    connection.end();
                }
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var update = function (id, username, firstName, lastName, email, countryId, roleId) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, query, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mysql_1.Connect)()];
            case 1:
                connection = _a.sent();
                query = "UPDATE users SET username = \"".concat(username, "\", first_name = \"").concat(firstName, "\", last_name = \"").concat(lastName, "\", email = \"").concat(email, "\", country_id = ").concat(countryId, ", role_id = ").concat(roleId, " WHERE user_id = ").concat(id);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, (0, mysql_1.Query)(connection, query)];
            case 3:
                result = _a.sent();
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_UPDATE_USER, result);
                return [2 /*return*/, result];
            case 4:
                error_6 = _a.sent();
                throw error_6;
            case 5:
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_CLOSE_CONNECTION);
                if (connection) {
                    connection.end();
                }
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var destroy = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, query, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mysql_1.Connect)()];
            case 1:
                connection = _a.sent();
                query = "UPDATE users SET is_active = 0 WHERE user_id = ".concat(id);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, (0, mysql_1.Query)(connection, query)];
            case 3:
                _a.sent();
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_DELETE_USER);
                return [3 /*break*/, 6];
            case 4:
                error_7 = _a.sent();
                throw error_7;
            case 5:
                logging_1.default.info(statics_1.NAMESPACE_USER_REPOSITORY, statics_1.MESSAGE_CLOSE_CONNECTION);
                if (connection) {
                    connection.end();
                }
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.default = { findAll: findAll, findById: findById, findByUsername: findByUsername, updatePasswordByUsername: updatePasswordByUsername, insert: insert, update: update, destroy: destroy };
