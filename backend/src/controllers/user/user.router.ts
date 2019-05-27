/**
 * Router for /api/users
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import {
    getUsers,
    createUser,
    deleteAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    exportUsersAsCsv,
} from './user.controller';

export const userRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL */
userRouter.get('/', logTime, wrapAsync(getUsers));

/** CREATE */
userRouter.post('/', logTime, wrapAsync(createUser));

/** Download as CSV data */
userRouter.get('/download', logTime, wrapAsync(exportUsersAsCsv));

/** Delete all activities in the database */
userRouter.delete('/delete_all', logTime, wrapAsync(deleteAllUsers));

/** READ BY ID */
userRouter.get('/:userid', logTime, wrapAsync(getSingleUser));

/** UPDATE */
userRouter.put('/:userid', logTime, wrapAsync(updateSingleUser));

/** DELETE */
userRouter.delete('/:userid', logTime, wrapAsync(deleteSingleUser));
