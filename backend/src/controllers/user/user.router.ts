/**
 * Router for /api/users
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import {
    getAllUsers,
    deleteAllUsers,
    login,
    exportUsersAsCsv,
    updateSingleUserWithToken,
    deleteSingleUserWithToken,
    registerUser,
    confirmEmail,

    createUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    getUsers,
} from './user.controller';
import { user } from '../../models/user.model';

export const userRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL but check admin before send response req: ?id=... */
userRouter.get('/get_all/:token', logTime, wrapAsync(getAllUsers));

/** CREATE */
userRouter.post('/register', logTime, wrapAsync(registerUser));

/** Download as CSV data */
userRouter.get('/download', logTime, wrapAsync(exportUsersAsCsv));

/** Delete all activities in the database */
userRouter.delete('/delete_all', logTime, wrapAsync(deleteAllUsers));

/** READ BY email and address with query ?email=..&&address=.. */
userRouter.get('/login', logTime, wrapAsync(login));

/** UPDATE */
userRouter.put('/update/:token', logTime, wrapAsync(updateSingleUserWithToken));

/** DELETE */
userRouter.delete('/delete/:token', logTime, wrapAsync(deleteSingleUserWithToken));

userRouter.get('/confirm_email/:token', logTime, wrapAsync(confirmEmail))

/**For Testing*/


/** READ ALL */
userRouter.get('/', logTime, wrapAsync(getUsers));

/** CREATE */
userRouter.post('/', logTime, wrapAsync(createUser));

/** READ BY ID */
userRouter.get('/:userid', logTime, wrapAsync(getSingleUser));

/** UPDATE */
userRouter.put('/:userid', logTime, wrapAsync(updateSingleUser));

/** DELETE */
userRouter.delete('/:userid', logTime, wrapAsync(deleteSingleUser));

