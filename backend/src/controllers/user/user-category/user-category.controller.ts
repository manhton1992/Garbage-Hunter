/**
 * Controller for /api/UserCategory
 */

/** Package imports */
import converter from 'json-2-csv';
import { Request, Response } from 'express';
import { IUserCategoryModel, userCategory } from '../../../models/user-category.model';

/**
 * Get all UserCategory.
 * @param req
 * @param res
 */
export const getUserCategory = async (req: Request, res: Response) => {
    try {
        /** Process queries to check for dates*/
        //req.query = processQueries(req.query);

        const userCategories: IUserCategoryModel[] = await userCategory.find(req.query);
        res.status(200).send({
            data: {
                status: 'success',
                items: userCategories.length,
                docs: userCategories,
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
 * Create new User category
 * @param req
 * @param res
 */
export const createUserCategory = async (req: Request, res: Response) => {
    try {
        const newUserCategory: IUserCategoryModel = await userCategory.create(req.body);
        res.status(201).send({
            data: {
                status: 'success',
                docs: newUserCategory,
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
 * Delete all UserCategory
 * @param req
 * @param res
 */
export const deleteAllUserCategory = async (req: Request, res: Response) => {
    try {
        await userCategory.deleteMany({});
        res.status(200).send({
            data: {
                status: 'success',
                message: 'all User category are deleted',
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
 * Get a single User category by id
 * @param req
 * @param res
 */
export const getSingleUserCategory = async (req: Request, res: Response) => {
    try {
        const singleUserCategory: IUserCategoryModel | null 
        = await userCategory.findById(req.params.userCategoryId);
        res.status(200).send({
            data: {
                status: 'success',
                docs: singleUserCategory,
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
 * Update a single User category by id
 * @param req
 * @param res
 */
export const updateSingleUserCategory = async (req: Request, res: Response) => {
    try {
        const updateUserCategory: IUserCategoryModel | null 
        = await userCategory.findByIdAndUpdate(req.params.userCategoryId, req.body, {
            new: true,
        });
        res.status(200).send({
            data: {
                status: 'success',
                docs: updateUserCategory,
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
 * Delete a single User category by id
 * @param req
 * @param res
 */
export const deleteSingleUserCategory = async (req: Request, res: Response) => {
    try {
        const deleteUserCategory: IUserCategoryModel | null = await userCategory.findByIdAndDelete(req.params.userCategoryId);
        res.status(200).send({
            data: {
                status: 'success',
                docs: deleteUserCategory,
            },
        });
    } catch (error) {
        res.status(400).send({
            data: {
                status: 'error',
                User: error.User,
            },
        });
    }
};

