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
var logging_1 = __importDefault(require("../config/logging"));
var statics_1 = require("../commons/statics");
var user_repository_1 = __importDefault(require("../repositories/user.repository"));
var auth_service_1 = require("./auth.service");
var findAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                logging_1.default.info(statics_1.NAMESPACE_USER_SERVICE, statics_1.MESSAGE_GETTING_ALL_USERS);
                return [4 /*yield*/, user_repository_1.default.findAll()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, { result: result, status: statics_1.STATUS_CODE.OK }];
            case 2:
                error_1 = _a.sent();
                logging_1.default.error(statics_1.NAMESPACE_USER_SERVICE, error_1.message, error_1);
                return [2 /*return*/, { result: "".concat(statics_1.ERROR_VALUE).concat(error_1.message), status: statics_1.STATUS_CODE.INTERNAL_ERROR }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var findById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                logging_1.default.info(statics_1.NAMESPACE_USER_SERVICE, statics_1.MESSAGE_GETTING_USER);
                return [4 /*yield*/, user_repository_1.default.findById(id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, { result: result, status: statics_1.STATUS_CODE.OK }];
            case 2:
                error_2 = _a.sent();
                logging_1.default.error(statics_1.NAMESPACE_USER_SERVICE, error_2.message, error_2);
                return [2 /*return*/, { result: "".concat(statics_1.ERROR_VALUE).concat(error_2.message), status: statics_1.STATUS_CODE.INTERNAL_ERROR }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createUser = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var isValidUsername, encryptedPassword, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                logging_1.default.info(statics_1.NAMESPACE_USER_SERVICE, statics_1.MESSAGE_INSERTING_USER);
                return [4 /*yield*/, validateUsername(req.username)];
            case 1:
                isValidUsername = _a.sent();
                if (!isValidUsername) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_USER_UNAVAILABLE, status: statics_1.STATUS_CODE.BAD_REQUEST }];
                }
                encryptedPassword = (0, auth_service_1.hashPassword)(req.password);
                return [4 /*yield*/, user_repository_1.default.insert(req.username, req.firstName, req.lastName, req.email, req.countryId, req.roleId, encryptedPassword)];
            case 2:
                _a.sent();
                return [2 /*return*/, { result: statics_1.MESSAGE_CREATE_USER, status: statics_1.STATUS_CODE.OK }];
            case 3:
                error_3 = _a.sent();
                logging_1.default.error(statics_1.NAMESPACE_USER_SERVICE, error_3.message, error_3);
                return [2 /*return*/, { result: "".concat(statics_1.ERROR_VALUE).concat(error_3.message), status: statics_1.STATUS_CODE.INTERNAL_ERROR }];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateUser = function (id, req) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userExist, isValidUsername, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                logging_1.default.info(statics_1.NAMESPACE_USER_SERVICE, statics_1.MESSAGE_UPDATING_USER);
                return [4 /*yield*/, user_repository_1.default.findById(id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, auth_service_1.validateUserById)(id, user)];
            case 2:
                userExist = _a.sent();
                if (!userExist) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_USER_NOT_FOUND, status: statics_1.STATUS_CODE.NOT_FOUND }];
                }
                return [4 /*yield*/, validateUsername(req.username)];
            case 3:
                isValidUsername = _a.sent();
                if (!isValidUsername) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_USER_UNAVAILABLE, status: statics_1.STATUS_CODE.BAD_REQUEST }];
                }
                return [4 /*yield*/, user_repository_1.default.update(id, req.username, req.firstName, req.lastName, req.email, req.countryId, req.roleId)];
            case 4:
                _a.sent();
                return [2 /*return*/, { result: statics_1.MESSAGE_UPDATE_USER, status: statics_1.STATUS_CODE.OK }];
            case 5:
                error_4 = _a.sent();
                logging_1.default.error(statics_1.NAMESPACE_USER_SERVICE, error_4.message, error_4);
                return [2 /*return*/, { result: "".concat(statics_1.ERROR_VALUE).concat(error_4.message), status: statics_1.STATUS_CODE.INTERNAL_ERROR }];
            case 6: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userExist, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                logging_1.default.info(statics_1.NAMESPACE_USER_SERVICE, statics_1.MESSAGE_DELETING_USER);
                return [4 /*yield*/, user_repository_1.default.findById(id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, auth_service_1.validateUserById)(id, user)];
            case 2:
                userExist = _a.sent();
                if (!userExist) {
                    return [2 /*return*/, { result: statics_1.MESSAGE_USER_NOT_FOUND, status: statics_1.STATUS_CODE.NOT_FOUND }];
                }
                return [4 /*yield*/, user_repository_1.default.destroy(id)];
            case 3:
                _a.sent();
                return [2 /*return*/, { result: statics_1.MESSAGE_DELETE_USER, status: statics_1.STATUS_CODE.OK }];
            case 4:
                error_5 = _a.sent();
                logging_1.default.error(statics_1.NAMESPACE_USER_SERVICE, error_5.message, error_5);
                return [2 /*return*/, { result: "".concat(statics_1.ERROR_VALUE).concat(error_5.message), status: statics_1.STATUS_CODE.INTERNAL_ERROR }];
            case 5: return [2 /*return*/];
        }
    });
}); };
var validateUsername = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_repository_1.default.findByUsername(username)];
            case 1:
                user = _a.sent();
                if (user.length < 1) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.default = { findAll: findAll, findById: findById, createUser: createUser, updateUser: updateUser, deleteUser: deleteUser };
