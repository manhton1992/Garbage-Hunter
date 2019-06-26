/**
 * Controller for /api/categories
 */

/** Package imports */
import { Request, Response } from 'express';
import { ICategoryModel, category } from '../../models/category.model';
import { sendSuccess, sendBadRequest, sendCreated } from '../../helpers/request-response-helper/response-status';

/**
 * Get all categories.
 * @param req
 * @param res
 */
export const getCategories = async (req: Request, res: Response) => {
	try {
		const categories: ICategoryModel[] = await category.find(req.query);
		sendSuccess(res, categories);
	} catch (error) {
		sendBadRequest(res, error.message);
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
		sendCreated(res, newCategory);
	} catch (error) {
		sendBadRequest(res, error.message);
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
		sendSuccess(res, null, 'all categories are deleted');
	} catch (error) {
		sendBadRequest(res, error.message);
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
		sendSuccess(res, singleCategory);
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Update a single category by id
 * @param req
 * @param res
 */
export const updateSingleCategory = async (req: Request, res: Response) => {
	try {
		const updateCategory: ICategoryModel | null = await category.findByIdAndUpdate(
			req.params.categoryId,
			req.body,
			{
				new: true,
			}
		);
		sendSuccess(res, updateCategory);
	} catch (error) {
		sendBadRequest(res, error.message);
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
		sendSuccess(res, deleteCategory);
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};
