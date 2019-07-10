/**
 * Controller for /api/email
 */

/** Package imports */
import { Request, Response } from 'express';
import { sendMailSubscribe } from '../../helpers/email-helper/send-email';
import { sendSuccess, sendBadRequest } from '../../helpers/request-response-helper/response-status';

/**
 * Get all categories.
 * @param req
 * @param res
 */
export const sendEmailSubscribe = async (req: Request, res: Response) => {
	try {
		if (req.query.userId && req.query.messageId) {
			sendMailSubscribe(req.query.userId, req.query.messageId);
			sendSuccess(res, null, 'subscribe email is sent!');
		} else {
			sendBadRequest(res, 'user id of message id is undefined');
		}
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};
