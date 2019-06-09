/**
 * Global router
 */


/** Package imports */
import * as express from 'express';
import { messageRouter } from './message/message.router';
import { userRouter } from './user/user.router';
import { commentRouter } from './message/comment/comment.router';
import { categoryRouter } from './category/category.router';
import { messageCategoryRouter } from './message/message-category/message-category.router';
import { userCategoryRouter } from './user/user-category/user-category.router';

export const globalRouter: express.Router = express.Router({ mergeParams: true });

/** /api/messages route */
globalRouter.use('/messages', messageRouter);
/** /api/messages/:messageid/comments route */
globalRouter.use('/messages/:messageid/comments', commentRouter);
/** /api/users route */
globalRouter.use('/users', userRouter);
/** /api/categories */
globalRouter.use('/categories', categoryRouter);
/** /api/message_category */
globalRouter.use('/message_category', messageCategoryRouter);
/** /api/user_category */
globalRouter.use('/user_category', userCategoryRouter);