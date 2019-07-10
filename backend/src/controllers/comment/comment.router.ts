/**
 * Router for /api/comments
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import {
	getComments,
	createComment,
	deleteAllComments,
	getSingleComment,
	updateSingleComment,
	deleteSingleComment,
	getCommentsWithMessageId,
} from './comment.controller';
import { verifyToken } from '../../middlewares/authorization.middleware';

export const commentRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL */
commentRouter.get('/', logTime, wrapAsync(getComments));

/** CREATE */
commentRouter.post('/', logTime, verifyToken, wrapAsync(createComment));

/** Delete all activities in the database */
commentRouter.delete('/delete_all', logTime, verifyToken, wrapAsync(deleteAllComments));

/** READ BY ID */
commentRouter.get('/:commentid', logTime, wrapAsync(getSingleComment));

/** READ BY ID */
// TODO i think this is not needed, can use getComments(messageid)
commentRouter.get('/get_by_messageid/:messageId', logTime, wrapAsync(getCommentsWithMessageId));

/** UPDATE */
commentRouter.put('/:commentid', logTime, verifyToken, wrapAsync(updateSingleComment));

/** DELETE */
commentRouter.delete('/:commentid', logTime, verifyToken, wrapAsync(deleteSingleComment));
