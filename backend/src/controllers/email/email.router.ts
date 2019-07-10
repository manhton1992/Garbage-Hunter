/**
 * Router for /api/email
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import { sendEmailSubscribe } from './email.controller';

export const emailRouter: express.Router = express.Router({ mergeParams: true });

/** SEND EMAIL SUBSCRIBE */
emailRouter.get('/', logTime, wrapAsync(sendEmailSubscribe));
