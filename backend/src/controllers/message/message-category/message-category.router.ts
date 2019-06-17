/**
 * Router for /api/message-
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../../middlewares/errorhandler.middleware';
import {
    getMessageCategory,
    createMessageCategory,
    deleteAllMessageCategory,
    getSingleMessageCategory,
    updateSingleMessageCategory,
    deleteSingleMessageCategory,
} from './message-category.controller';

export const messageCategoryRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL */
messageCategoryRouter.get('/', logTime, wrapAsync(getMessageCategory));

/** CREATE */
messageCategoryRouter.post('/', logTime, wrapAsync(createMessageCategory));


/** Delete all activities in the database */
messageCategoryRouter.delete('/delete_all', logTime, wrapAsync(deleteAllMessageCategory));

/** READ BY ID */
messageCategoryRouter.get('/:messageCategoryId', logTime, wrapAsync(getSingleMessageCategory));

/** UPDATE */
messageCategoryRouter.put('/:messageCategoryId', logTime, wrapAsync(updateSingleMessageCategory));

/** DELETE */
messageCategoryRouter.delete('/:messageCategoryId', logTime, wrapAsync(deleteSingleMessageCategory));
