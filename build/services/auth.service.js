"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.hashPassword = exports.validateUserById = void 0;
var bcrypt = __importStar(require("bcryptjs"));
var jwt = __importStar(require("jsonwebtoken"));
var statics_1 = require("../commons/statics");
var logging_1 = __importDefault(require("../config/logging"));
var config_1 = __importDefault(require("../config/config"));
var user_repository_1 = __importDefault(require("../repositories/user.repository"));
var validation_request_middleware_1 = __importDefault(require("../middlewares/validation.request.middleware"));
var loginUser = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                logging_1.default.info(statics_1.NAMESPACE_AUTH_SERVICE, statics_1.MESSAGE_LOGIN_USER);
                return [4 /*yield*/, user_repository_1.default.findByUsername(req.username)];
            case 1:
                user = _a.sent();
                if (user.length < 1) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_USER_NOT_FOUND, status: statics_1.STATUS_CODE.NOT_FOUND }];
                }
                if (!checkIfUnencryptedPasswordIsValid(req.password, user[0].password)) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_PASSWORD_NOT_FOUND, status: statics_1.STATUS_CODE.BAD_REQUEST }];
                }
                token = setToken((0, validation_request_middleware_1.default)(user[0]));
                return [2 /*return*/, { result: token, status: statics_1.STATUS_CODE.OK }];
            case 2:
                error_1 = _a.sent();
                logging_1.default.error(statics_1.NAMESPACE_AUTH_SERVICE, error_1.message, error_1);
                return [2 /*return*/, { result: "".concat(statics_1.ERROR_VALUE).concat(error_1.message), status: statics_1.STATUS_CODE.INTERNAL_ERROR }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getUserData = function (token) {
    var decodedToken = jwt.decode(token);
    return { userId: decodedToken.userId, username: decodedToken.username };
};
var generateRefreshToken = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, user, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                logging_1.default.info(statics_1.NAMESPACE_AUTH_SERVICE, statics_1.MESSAGE_LOGIN_USER);
                userData = getUserData(req.auth);
                return [4 /*yield*/, user_repository_1.default.findById(userData.userId)];
            case 1:
                user = _a.sent();
                if (user.length < 1) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_USER_NOT_FOUND, status: statics_1.STATUS_CODE.NOT_FOUND }];
                }
                if (user[0].username != userData.username) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_USER_NOT_FOUND, status: statics_1.STATUS_CODE.NOT_FOUND }];
                }
                token = setRefreshToken((0, validation_request_middleware_1.default)(user[0]));
                return [2 /*return*/, { result: token, status: statics_1.STATUS_CODE.OK }];
            case 2:
                error_2 = _a.sent();
                logging_1.default.error(statics_1.NAMESPACE_AUTH_SERVICE, error_2.message, error_2);
                return [2 /*return*/, { result: "".concat(statics_1.ERROR_VALUE).concat(error_2.message), status: statics_1.STATUS_CODE.INTERNAL_ERROR }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var changePasswordUser = function (id, req) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userExist, passwordEncrypted, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                logging_1.default.info(statics_1.NAMESPACE_AUTH_SERVICE, statics_1.MESSAGE_CHANGE_PASSWORD_USER);
                return [4 /*yield*/, user_repository_1.default.findById(id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, exports.validateUserById)(id, user)];
            case 2:
                userExist = _a.sent();
                if (!userExist) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_USER_NOT_FOUND, status: statics_1.STATUS_CODE.NOT_FOUND }];
                }
                if (!checkIfUnencryptedPasswordIsValid(req.oldPassword, user[0].password)) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_PASSWORD_NOT_FOUND, status: statics_1.STATUS_CODE.BAD_REQUEST }];
                }
                passwordEncrypted = (0, exports.hashPassword)(req.newPassword);
                return [4 /*yield*/, user_repository_1.default.updatePasswordByUsername(user[0].username, passwordEncrypted)];
            case 3:
                _a.sent();
                return [2 /*return*/, { result: statics_1.MESSAGE_UPDATE_USER, status: statics_1.STATUS_CODE.OK }];
            case 4:
                error_3 = _a.sent();
                logging_1.default.error(statics_1.NAMESPACE_AUTH_SERVICE, error_3.message, error_3);
                return [2 /*return*/, { result: "".concat(statics_1.ERROR_VALUE).concat(error_3.message), status: statics_1.STATUS_CODE.INTERNAL_ERROR }];
            case 5: return [2 /*return*/];
        }
    });
}); };
var setRefreshToken = function (user) {
    return jwt.sign({ userId: user.userId, username: user.username }, config_1.default.jwtSecret.refresh, { expiresIn: config_1.default.jwtSecret.expires });
};
var setToken = function (user) {
    return jwt.sign({ userId: user.userId, username: user.username }, config_1.default.jwtSecret.secret, { expiresIn: config_1.default.jwtSecret.expires });
};
var validateUserById = function (id, user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (user.length < 1) {
            return [2 /*return*/, false];
        }
        else {
            return [2 /*return*/, true];
        }
        return [2 /*return*/];
    });
}); };
exports.validateUserById = validateUserById;
var checkIfUnencryptedPasswordIsValid = function (unencryptedPassword, password) {
    var passwordEncrypted = (0, exports.hashPassword)(unencryptedPassword);
    return bcrypt.compareSync(unencryptedPassword, passwordEncrypted);
};
var hashPassword = function (unencryptedPassword) {
    return bcrypt.hashSync(unencryptedPassword, 8);
};
exports.hashPassword = hashPassword;
exports.default = { loginUser: loginUser, changePasswordUser: changePasswordUser, generateRefreshToken: generateRefreshToken };
