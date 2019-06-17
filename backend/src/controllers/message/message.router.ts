/**
 * Router for /api/messages
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import {
    getMessages,
    createMessage,
    deleteAllMessages,
    getSingleMessage,
    updateSingleMessage,
    deleteSingleMessage,
    exportMessagesAsCsv,
    uploadImage,
    deleteImage,
} from './message.controller';

export const messageRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL */
messageRouter.get('/', logTime, wrapAsync(getMessages));

/** CREATE */
messageRouter.post('/', logTime, wrapAsync(createMessage));

/** Download as CSV data */
messageRouter.get('/download', logTime, wrapAsync(exportMessagesAsCsv));

/** Upload image to AWS S3 */
messageRouter.post('/image_upload', logTime, wrapAsync(uploadImage));

/** Delete image from AWS S3 */
messageRouter.post('/delete_image', logTime, wrapAsync(deleteImage));

/** Delete all activities in the database */
messageRouter.delete('/delete_all', logTime, wrapAsync(deleteAllMessages));

/** READ BY ID */
messageRouter.get('/:messageid', logTime, wrapAsync(getSingleMessage));

/** UPDATE */
messageRouter.put('/:messageid', logTime, wrapAsync(updateSingleMessage));

/** DELETE */
messageRouter.delete('/:messageid', logTime, wrapAsync(deleteSingleMessage));
