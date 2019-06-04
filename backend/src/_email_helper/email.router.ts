/**
 * api/email/.. 
 * */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../middlewares/timelogger.middleware';
import { wrapAsync } from '../middlewares/errorhandler.middleware';
import { sendMailRegister } from './email.controller';

export const emailRouter: express.Router = express.Router({ mergeParams: true });

/** send email register */
emailRouter.get('register/:userId', logTime, wrapAsync(sendMailRegister));

/** send email follower */
//emailRouter.get('send_mail_follow/:userId', logTime, wrapAsync(sendMailRegister));


