/**
 * Router for /api/email
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import {
    sendEmailSubcribe
} from './email.controller';

export const emailRouter: express.Router = express.Router({ mergeParams: true });

/** SEND EMAIL SUBCRIBE */
emailRouter.get('/', logTime, wrapAsync(sendEmailSubcribe));

