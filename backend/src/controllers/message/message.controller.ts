/**
 * Controller for /api/messages
 */

/** Package imports */
import converter from 'json-2-csv';
import { Request, Response } from 'express';
import { IMessageModel, message } from '../../models/message.model';
import { upload, deleteFile } from '../../helpers/image-upload-helper/image-upload';
import * as jwt from 'jsonwebtoken';
import config from 'config';
import {
    sendSuccess,
    sendBadRequest,
    sendForbidden,
    sendCreated,
    sendUnprocessable,
} from '../../helpers/request-response-helper/response-status';

/** Secret key to verify API callers */
const myJWTSecretKey = config.get<string>('jwt.secret-key');

/**
 * Get all messages.
 * @param req
 * @param res
 */
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages: IMessageModel[] = await message.find(req.query);
        sendSuccess(res, messages);
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Create new message
 * @param req
 * @param res
 */
export const createMessage = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                const newMessage: IMessageModel = await message.create(req.body);
                sendCreated(res, newMessage);
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Download all messages as a csv file
 * @param req
 * @param res
 */
export const exportMessagesAsCsv = async (req: Request, res: Response) => {
    try {
        const messages: IMessageModel[] = await message.find({});
        let documents: object[] = [];
        messages.forEach((item) => {
            let data = {
                id: item.id,
                title: item.title,
                description: item.description,
                creatorid: item.creatorId,
                lon: item.lon,
                lat: item.lat,
                address: item.address,
                available: item.available,
                archive: item.archive,
                image: item.imageUrl,
                phone: item.phone,
                created: item.created_at,
            };
            documents.push(data);
        });

        /** Convert to CSV data */
        converter.json2csv(documents, (err, csv) => {
            res.setHeader('Content-disposition', 'attachment; filename="all_messages.csv"');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Delete all messages
 * @param req
 * @param res
 */
export const deleteAllMessages = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                await message.deleteMany({});
                sendSuccess(res, null, 'all messages are deleted');
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Get a single message by id
 * @param req
 * @param res
 */
export const getSingleMessage = async (req: Request, res: Response) => {
    try {
        const singleMessage: IMessageModel | null = await message.findById(req.params.messageid);
        sendSuccess(res, singleMessage);
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Update a single message by id
 * @param req
 * @param res
 */
export const updateSingleMessage = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                const updateMessage: IMessageModel | null = await message.findByIdAndUpdate(
                    req.params.messageid,
                    req.body,
                    {
                        new: true,
                    }
                );
                sendSuccess(res, updateMessage, undefined);
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Delete a single message by id
 * @param req
 * @param res
 */
export const deleteSingleMessage = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                const deleteMessage: IMessageModel | null = await message.findByIdAndDelete(req.params.messageid);
                sendSuccess(res, deleteMessage, undefined);
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Upload image to AWS S3
 * @param req
 * @param res
 */
export const uploadImage = async (req: any, res: Response) => {
    try {
        const singleUpload = upload.single('image');
        singleUpload(req, res, (error) => {
            if (error) {
                sendUnprocessable(res, error.message);
            } else {
                sendSuccess(res, { imageUrl: req.file.location });
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};

/**
 * Delete file from AWS S3
 * @param req
 * @param res
 */
export const deleteImage = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
            if (error) {
                sendForbidden(res, error.message);
            } else {
                deleteFile(req.body.key);
                sendSuccess(res, null, 'image is removed');
            }
        });
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};
