/**
 * Middleware for error handler
 */

/** Package imports */
import { Request, Response, NextFunction } from 'express';
import { sendInternalError } from '../helpers/request-response-helper/response-status';

/**
 * Wrapper for the error handler
 * @param func
 */
export const wrapAsync = (func: Function) => {
	return function(request: Request, response: Response, next: NextFunction) {
		func(request, response, next).catch(next);
	};
};

/**
 * Global error handler
 * @param error
 * @param request
 * @param response
 * @param next
 */
export const globalErrorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
	sendInternalError(response, error.message);
};
