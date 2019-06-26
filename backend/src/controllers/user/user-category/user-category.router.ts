/**
 * Router for /api/user-category
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../../middlewares/errorhandler.middleware';
import {
	getUserCategory,
	createUserCategory,
	deleteAllUserCategory,
	getSingleUserCategory,
	updateSingleUserCategory,
	deleteSingleUserCategory,
} from './user-category.controller';
import { verifyToken } from '../../../middlewares/authorization.middleware';

export const userCategoryRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL */
userCategoryRouter.get('/', logTime, wrapAsync(getUserCategory));

/** CREATE */
userCategoryRouter.post('/', logTime, verifyToken, wrapAsync(createUserCategory));

/** Delete all activities in the database */
userCategoryRouter.delete('/delete_all', logTime, verifyToken, wrapAsync(deleteAllUserCategory));

/** READ BY ID */
userCategoryRouter.get('/:userCategoryId', logTime, wrapAsync(getSingleUserCategory));

/** UPDATE */
userCategoryRouter.put('/:userCategoryId', logTime, verifyToken, wrapAsync(updateSingleUserCategory));

/** DELETE */
userCategoryRouter.delete('/:userCategoryId', logTime, verifyToken, wrapAsync(deleteSingleUserCategory));
