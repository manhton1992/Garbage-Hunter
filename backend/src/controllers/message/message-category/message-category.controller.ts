/**
 * Controller for /api/messageCategory
 */

/** Package imports */
import { Request, Response } from 'express';
import { IMessageCategoryModel, messageCategory } from '../../../models/message-category.model';
import { sendSuccess, sendBadRequest, sendCreated } from '../../../helpers/request-response-helper/response-status';

/**
 * Get all messageCategory.
 * @param req
 * @param res
 */
export const getMessageCategory = async (req: Request, res: Response) => {
    try {
        const messageCategories: IMessageCategoryModel[] = await messageCategory.find(req.query);
        sendSuccess(res, messageCategories);
    } catch (error) {
        sendBadRequest(res, error.message);
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
        sendCreated(res, newMessageCategory);
    } catch (error) {
        sendBadRequest(res, error.message);
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
        sendSuccess(res, null, 'all message category are deleted');
    } catch (error) {
        sendBadRequest(res, error.message);
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
        sendSuccess(res, singleMessageCategory);
    } catch (error) {
        sendBadRequest(res, error.message);
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
        sendSuccess(res, updateMessageCategory);
    } catch (error) {
        sendBadRequest(res, error.message);
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
        sendSuccess(res, deleteMessageCategory);
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};
