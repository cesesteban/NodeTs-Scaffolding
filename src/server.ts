import express, { Express, Request, Response, NextFunction } from 'express';
import http, { Server } from 'http';
import bodyParser from 'body-parser';
import routes from './routes';
import helmet from 'helmet';
import cors from 'cors';
import { NAMESPACE_API_SERVER, NOT_FOUND, SERVER_RUNNING_MESSAGE, STATUS_CODE } from './commons/statics';
import logging from './config/logging';
import config from './config/config';

const router: Express = express();

/** Log the request */
router.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    logging.info(NAMESPACE_API_SERVER, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE_API_SERVER, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use(cors());
router.use(helmet());

/** Route here */
router.use('/', routes);

/** Error handling */
router.use((req: Request, res: Response, next: NextFunction) => {
    const error: Error = new Error(NOT_FOUND);

    res.status(STATUS_CODE.NOT_FOUND).json({
        message: error.message
    });
});

const httpServer: Server = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE_API_SERVER, `${SERVER_RUNNING_MESSAGE} ${config.server.port}`));
