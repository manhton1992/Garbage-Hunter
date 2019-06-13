/**
 * Controller for /api/categories
 */

/** Package imports */
import converter from 'json-2-csv';
import { Request, Response } from 'express';
import { ICategoryModel, category } from '../../models/category.model';

/**
 * Get all categories.
 * @param req
 * @param res
 */
export const getCategories = async (req: Request, res: Response) => {
    try {

        const categories: ICategoryModel[] = await category.find();
        if (categories){
            res.status(200).send({
                data: {
                    status: 'success',
                    items: categories.length,
                    docs: categories,
                },
            });
        } else {
            res.status(200).send({
                data: {
                    status: 'fail',
                    message: 'no categories avaiable'
                },
            });
        }

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
 * Create new category
 * @param req
 * @param res
 */
export const createCategory = async (req: Request, res: Response) => {
    try {
        const newCategory: ICategoryModel = await category.create(req.body);
        res.status(201).send({
            data: {
                status: 'success',
                docs: newCategory,
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
 * Delete all categories
 * @param req
 * @param res
 */
export const deleteAllCategories = async (req: Request, res: Response) => {
    try {
        await category.deleteMany({});
        res.send({
            data: {
                status: 'success',
                message: 'all categories are deleted',
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
 * Get a single category by id
 * @param req
 * @param res
 */
export const getSingleCategory = async (req: Request, res: Response) => {
    try {
        const singleCategory: ICategoryModel | null = await category.findById(req.params.categoryId);
        res.status(200).send({
            data: {
                status: 'success',
                docs: singleCategory,
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
 * Update a single category by id
 * @param req
 * @param res
 */
export const updateSingleCategory = async (req: Request, res: Response) => {
    try {
        const updateCategory: ICategoryModel | null = await category.findByIdAndUpdate(req.params.categoryId, req.body, {
            new: true,
        });
        res.status(200).send({
            data: {
                status: 'success',
                docs: updateCategory,
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
 * Delete a single category by id
 * @param req
 * @param res
 */
export const deleteSingleCategory = async (req: Request, res: Response) => {
    try {
        const deleteCategory: ICategoryModel | null = await category.findByIdAndDelete(req.params.categoryId);
        res.status(200).send({
            data: {
                status: 'success',
                docs: deleteCategory,
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

