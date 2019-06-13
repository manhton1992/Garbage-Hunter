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
    getUserCategoryByCategoryId,
} from './user-category.controller';

export const userCategoryRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL */
userCategoryRouter.get('/', logTime, wrapAsync(getUserCategory));

/** CREATE */
userCategoryRouter.post('/', logTime, wrapAsync(createUserCategory));


/** Delete all activities in the database */
userCategoryRouter.delete('/delete_all', logTime, wrapAsync(deleteAllUserCategory));

/** READ BY Category ID */
userCategoryRouter.get('/:categoryId', logTime, wrapAsync(getUserCategoryByCategoryId));

/** READ BY ID */
//userCategoryRouter.get('/:userCategoryId', logTime, wrapAsync(getSingleUserCategory));

/** UPDATE */
userCategoryRouter.put('/:userCategoryId', logTime, wrapAsync(updateSingleUserCategory));

/** DELETE */
userCategoryRouter.delete('/:userCategoryId', logTime, wrapAsync(deleteSingleUserCategory));
