/**
 * Controller for /api/messageCategory
 */

/** Package imports */
import converter from 'json-2-csv';
import { Request, Response } from 'express';
import { IMessageCategoryModel, messageCategory } from '../../../models/message-category.model';

/**
 * Get all messageCategory.
 * @param req
 * @param res
 */
export const getMessageCategory = async (req: Request, res: Response) => {
    try {
        /** Process queries to check for dates*/
        //req.query = processQueries(req.query);

        const messageCategories: IMessageCategoryModel[] = await messageCategory.find();
        res.status(200).send({
            data: {
                status: 'success',
                items: messageCategories.length,
                docs: messageCategories,
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
 * Create new message category
 * @param req
 * @param res
 */
export const createMessageCategory = async (req: Request, res: Response) => {
    try {
        const newMessageCategory: IMessageCategoryModel = await messageCategory.create(req.body);
        res.status(201).send({
            data: {
                status: 'success',
                docs: newMessageCategory,
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
 * Delete all messageCategory
 * @param req
 * @param res
 */
export const deleteAllMessageCategory = async (req: Request, res: Response) => {
    try {
        await messageCategory.deleteMany({});
        res.send({
            data: {
                status: 'success',
                message: 'all message category are deleted',
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
 * Get a single message category by id
 * @param req
 * @param res
 */
export const getSingleMessageCategory = async (req: Request, res: Response) => {
    try {
        const singleMessageCategory: IMessageCategoryModel | null = await messageCategory.findById(req.params.messageCategoryId);
        res.status(200).send({
            data: {
                status: 'success',
                docs: singleMessageCategory,
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
 * Update a single message category by id
 * @param req
 * @param res
 */
export const updateSingleMessageCategory = async (req: Request, res: Response) => {
    try {
        const updateMessageCategory: IMessageCategoryModel | null 
        = await messageCategory.findByIdAndUpdate(req.params.messageCategoryId, req.body, {
            new: true,
        });
        res.status(200).send({
            data: {
                status: 'success',
                docs: updateMessageCategory,
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
 * Delete a single message category by id
 * @param req
 * @param res
 */
export const deleteSingleMessageCategory = async (req: Request, res: Response) => {
    try {
        const deleteMessageCategory: IMessageCategoryModel | null = await messageCategory.findByIdAndDelete(req.params.messageCategoryId);
        res.status(200).send({
            data: {
                status: 'success',
                docs: deleteAllMessageCategory,
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

