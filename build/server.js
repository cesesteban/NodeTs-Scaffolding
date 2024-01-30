"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var statics_1 = require("./commons/statics");
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var router = (0, express_1.default)();
/** Log the request */
router.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(statics_1.NAMESPACE_API_SERVER, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    res.on('finish', function () {
        /** Log the res */
        logging_1.default.info(statics_1.NAMESPACE_API_SERVER, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/** Rules of our API */
router.use((0, cors_1.default)());
router.use((0, helmet_1.default)());
/** Route here */
router.use('/', routes_1.default);
/** Error handling */
router.use(function (req, res, next) {
    var error = new Error(statics_1.NOT_FOUND);
    res.status(statics_1.STATUS_CODE.NOT_FOUND).json({
        message: error.message
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(statics_1.NAMESPACE_API_SERVER, "".concat(statics_1.SERVER_RUNNING_MESSAGE, " ").concat(config_1.default.server.port)); });
