/**
 * Controller for /api/UserCategory
 */

/** Package imports */
import { Request, Response } from 'express';
import { IUserCategoryModel, userCategory } from '../../../models/user-category.model';
import { sendSuccess, sendBadRequest, sendCreated } from '../../../helpers/request-response-helper/response-status';

/**
 * Get all UserCategory.
 * @param req
 * @param res
 */
export const getUserCategory = async (req: Request, res: Response) => {
	try {
		const userCategories: IUserCategoryModel[] = await userCategory.find(req.query);
		sendSuccess(res, userCategories);
	} catch (error) {
		sendBadRequest(res, error.message);
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
		sendCreated(res, newUserCategory);
	} catch (error) {
		sendBadRequest(res, error.message);
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
		sendSuccess(res, 'all user category are deleted');
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Get a single User category by id
 * @param req
 * @param res
 */
export const getSingleUserCategory = async (req: Request, res: Response) => {
	try {
		const singleUserCategory: IUserCategoryModel | null = await userCategory.findById(req.params.userCategoryId);
		sendSuccess(res, singleUserCategory);
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Update a single User category by id
 * @param req
 * @param res
 */
export const updateSingleUserCategory = async (req: Request, res: Response) => {
	try {
		const updateUserCategory: IUserCategoryModel | null = await userCategory.findByIdAndUpdate(
			req.params.userCategoryId,
			req.body,
			{
				new: true,
			}
		);
		sendSuccess(res, updateUserCategory);
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Delete a single User category by id
 * @param req
 * @param res
 */
export const deleteSingleUserCategory = async (req: Request, res: Response) => {
	try {
		const deleteUserCategory: IUserCategoryModel | null = await userCategory.findByIdAndDelete(
			req.params.userCategoryId
		);
		sendSuccess(res, deleteUserCategory);
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};
