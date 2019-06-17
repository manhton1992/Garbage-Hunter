/**
 * Controller for /api/messages
 */

/** Package imports */
import converter from 'json-2-csv';
import { Request, Response } from 'express';
import { IMessageModel, message } from '../../models/message.model';
import { upload } from '../../helpers/image-upload-helper/image-upload';

/**
 * Get all messages.
 * @param req
 * @param res
 */
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages: IMessageModel[] = await message.find(req.query);
        res.status(200).send({
            data: {
                status: 'success',
                items: messages.length,
                docs: messages,
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
 * Create new message
 * @param req
 * @param res
 */
export const createMessage = async (req: Request, res: Response) => {
    try {
        const newMessage: IMessageModel = await message.create(req.body);
        res.status(201).send({
            data: {
                status: 'success',
                docs: newMessage,
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
        res.status(400).send({
            data: {
                status: 'error',
                message: error.message,
            },
        });
    }
};

/**
 * Delete all messages
 * @param req
 * @param res
 */
export const deleteAllMessages = async (req: Request, res: Response) => {
    try {
        await message.deleteMany({});
        res.status(200).send({
            data: {
                status: 'success',
                message: 'all messages are deleted',
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
 * Get a single message by id
 * @param req
 * @param res
 */
export const getSingleMessage = async (req: Request, res: Response) => {
    try {
        const singleMessage: IMessageModel | null = await message.findById(req.params.messageid);
        res.status(200).send({
            data: {
                status: 'success',
                docs: singleMessage,
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
 * Update a single message by id
 * @param req
 * @param res
 */
export const updateSingleMessage = async (req: Request, res: Response) => {
    try {
        const updateMessage: IMessageModel | null = await message.findByIdAndUpdate(req.params.messageid, req.body, {
            new: true,
        });
        res.status(200).send({
            data: {
                status: 'success',
                docs: updateMessage,
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
 * Delete a single message by id
 * @param req
 * @param res
 */
export const deleteSingleMessage = async (req: Request, res: Response) => {
    try {
        const deleteMessage: IMessageModel | null = await message.findByIdAndDelete(req.params.messageid);
        res.status(200).send({
            data: {
                status: 'success',
                docs: deleteMessage,
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
 * Upload image to AWS S3
 * @param req
 * @param res
 */
export const uploadImage = async (req: any, res: Response) => {
    try {
        const singleUpload = upload.single('image');
        singleUpload(req, res, (error) => {
            if (error) {
                res.status(422).send({
                    data: {
                        status: 'error',
                        message: error.message,
                    },
                });
            } else {
                res.status(200).send({
                    data: {
                        status: 'success',
                        docs: {
                            imageUrl: req.file.location,
                        },
                    },
                });
            }
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
 * ======================================================================================
 * Functions
 * ======================================================================================
 */

/**
 * @description Process the queries for showing activities
 * @param {*} queries
 * @returns {object}
 */
const processQueries = (queries: any): object => {
    /** regex the params search for not dates */
    for (let key of Object.keys(queries)) {
        if (key != 'start_at' && key != 'end_at' && key != 'from' && key != 'until') {
            queries[key] = new RegExp(queries[key], 'i');
        }
    }
    /** handle from and until params */
    let fromQuery = queries.from;
    let untilQuery = queries.until;
    if (fromQuery || untilQuery) {
        let newQuery: object = {};
        if (fromQuery) {
            Object.assign(newQuery, { $gte: fromQuery });
            delete queries.from;
        }
        if (untilQuery) {
            Object.assign(newQuery, { $lte: untilQuery });
            delete queries.until;
        }
        queries.start_at = newQuery;
    }
    return queries;
};
