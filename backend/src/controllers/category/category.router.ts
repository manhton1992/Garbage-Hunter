/**
 * Router for /api/categories
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import { verifyToken } from '../../middlewares/authorization.middleware';
import {
    getCategories,
    createCategory,
    deleteAllCategories,
    getSingleCategory,
    updateSingleCategory,
    deleteSingleCategory,
} from './category.controller';

export const categoryRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL */
categoryRouter.get('/', logTime, wrapAsync(getCategories));

/** CREATE */
categoryRouter.post('/', logTime, verifyToken, wrapAsync(createCategory));

/** Delete all activities in the database */
categoryRouter.delete('/delete_all', logTime, verifyToken, wrapAsync(deleteAllCategories));

/** READ BY ID */
categoryRouter.get('/:categoryId', logTime, wrapAsync(getSingleCategory));

/** UPDATE */
categoryRouter.put('/:categoryId', logTime, verifyToken, wrapAsync(updateSingleCategory));

/** DELETE */
categoryRouter.delete('/:categoryId', logTime, verifyToken, wrapAsync(deleteSingleCategory));
