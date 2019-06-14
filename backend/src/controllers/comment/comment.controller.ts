/**
 * Controller for /api/comments
 */

/** Package imports */
import { Request, Response } from 'express';
import { ICommentModel, comment } from '../../models/comment.model';

/**
 * Get all comments in a message.
 * @param req
 * @param res
 */
export const getComments = async (req: Request, res: Response) => {
    try {
        const comments: ICommentModel[] = await comment.find(req.query);
        res.status(200).send({
            data: {
                status: 'success',
                items: comments.length,
                docs: comments,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Create new comment
 * @param req
 * @param res
 */
export const createComment = async (req: Request, res: Response) => {
    try {
        const newComment: ICommentModel = await comment.create(req.body);
        res.status(201).send({
            data: {
                status: 'success',
                docs: newComment,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Delete all comments in a message. 
 * @param req
 * @param res
 */
export const deleteAllComments = async (req: Request, res: Response) => {
    try {
        await comment.deleteMany({});
        res.send({
            data: {
                status: 'success',
                message: `all comments are deleted`,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
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
        res.status(200).send({
            data: {
                status: 'success',
                docs: singleComment,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Update a single message by id
 * @param req
 * @param res
 */
export const updateSingleComment = async (req: Request, res: Response) => {
    try {
        const updateComment: ICommentModel | null = await comment.findByIdAndUpdate(req.params.commentid, req.body, {
            new: true,
        });
        res.status(200).send({
            data: {
                status: 'success',
                docs: updateComment,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Delete a single message by id
 * @param req
 * @param res
 */
export const deleteSingleComment = async (req: Request, res: Response) => {
    try {
        const deleteComment: ICommentModel | null = await comment.findByIdAndDelete(req.params.commentid);
        res.status(200).send({
            data: {
                status: 'success',
                docs: deleteComment,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};
