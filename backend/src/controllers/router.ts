/**
 * Global router
 */

/** Package imports */
import * as express from 'express';
import { messageRouter } from './message/message.router';
import { userRouter } from './user/user.router';
import { commentRouter } from './message/comment/comment.router';

export const globalRouter: express.Router = express.Router({ mergeParams: true });

/** /api/messages route */
globalRouter.use('/messages', messageRouter);
/** /api/messages/:messageid/comments route */
globalRouter.use('/messages/:messageid/comments', commentRouter);
/** /api/users route */
globalRouter.use('/users', userRouter);
