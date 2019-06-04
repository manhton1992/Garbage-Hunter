/**
 * Global router
 */

 /** Package imports */
 import * as express from 'express';
 import { messageRouter } from './message/message.router';
 import { userRouter } from './user/user.router';
 
 export const globalRouter: express.Router = express.Router({mergeParams: true});
 
 /** /api/activites route */
 globalRouter.use('/messages', messageRouter);
 /** /api/eventbrite route */
 globalRouter.use('/users', userRouter);
/** /api/email */
globalRouter.use('/email', userRouter);