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

export const commentRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL */
commentRouter.get('/', logTime, wrapAsync(getComments));

/** CREATE */
commentRouter.post('/', logTime, wrapAsync(createComment));

/** Delete all activities in the database */
commentRouter.delete('/delete_all', logTime, wrapAsync(deleteAllComments));

/** READ BY ID */
commentRouter.get('/:commentid', logTime, wrapAsync(getSingleComment));

/** READ BY ID */
commentRouter.get('/get_by_messageid/:messageId', logTime, wrapAsync(getCommentsWithMessageId));

/** UPDATE */
commentRouter.put('/:commentid', logTime, wrapAsync(updateSingleComment));

/** DELETE */
commentRouter.delete('/:commentid', logTime, wrapAsync(deleteSingleComment));
