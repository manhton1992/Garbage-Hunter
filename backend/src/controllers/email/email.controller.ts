/**
 * Controller for /api/email
 */

/** Package imports */
import { Request, Response } from 'express';
import { sendMailSubcribe } from '../../helpers/email-helper/send-email'

/**
 * Get all categories.
 * @param req
 * @param res
 */
export const sendEmailSubcribe = async (req: Request, res: Response) => {
    try {
        if (req.query.userId && req.query.messageId){
            sendMailSubcribe(req.query.userId, req.query.messageId);
            res.status(200).send({
                data: {
                    status: 'success',
                }
            });
        } else {
            res.status(400).send({
                data: {
                    status: 'error',
                    message: 'userId or messageId is undefined',
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
