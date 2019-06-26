/**
 * Controller for /api/comments
 */

/** Package imports */
import { Request, Response } from 'express';
import { ICommentModel, comment } from '../../models/comment.model';
import { sendSuccess, sendBadRequest, sendCreated, sendForbidden } from '../../helpers/request-response-helper/response-status';
import * as jwt from 'jsonwebtoken';
import config from 'config';

/** Secret key to verify API callers */
const myJWTSecretKey = config.get<string>('jwt.secret-key');

/**
 * Get all comments in a message.
 * @param req
 * @param res
 */
export const getComments = async (req: Request, res: Response) => {
    try {
        const comments: ICommentModel[] = await comment.find(req.query);
        sendSuccess(res, comments);
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Create new comment
 * @param req
 * @param res
 */
export const createComment = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                const newComment: ICommentModel = await comment.create(req.body);
                sendCreated(res, newComment);
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Delete all comments in a message.
 * @param req
 * @param res
 */
export const deleteAllComments = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                await comment.deleteMany({});
                sendSuccess(res, null, 'all comments are deleted');
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Get a single message by id
 * @param req
 * @param res
 */
export const getSingleComment = async (req: Request, res: Response) => {
    try {
        const singleComment: ICommentModel | null = await comment.findById(req.params.commentid);
        sendSuccess(res, singleComment);
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Update a single message by id
 * @param req
 * @param res
 */
export const updateSingleComment = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                const updateComment: ICommentModel | null = await comment.findByIdAndUpdate(req.params.commentid, req.body, {
                    new: true,
                });
                sendSuccess(res, updateComment);
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Delete a single message by id
 * @param req
 * @param res
 */
export const deleteSingleComment = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                const deleteComment: ICommentModel | null = await comment.findByIdAndDelete(req.params.commentid);
                sendSuccess(res, deleteComment);
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

export const getCommentsWithMessageId = async (req: Request, res: Response) => {
    try {
        const comments :  ICommentModel[] | null = await comment.find({messageId: req.params.messageId});
        sendSuccess(res, comments);
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};
