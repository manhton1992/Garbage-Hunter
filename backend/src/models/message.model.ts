/**
 * Model for Message
 */

import * as mongoose from 'mongoose';

/**
 * @description interface for message.
 * @export
 * @interface IMessageModel
 * @extends {mongoose.Document}
 */
export interface IMessageModel extends mongoose.Document {
    title: string;
    description: string;
    creatorid: number;
    lon: number;
    lat: number;
    address: string;
    available: boolean;
    archive: boolean;
    image: string;
    phone?: number;
    created_at: Date;
    updated_at: Date;
}

/**
 * @description Schema of message for mongoose.
 * @export
 * @Schema messageSchema 
 */
export const messageSchema: mongoose.Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creatorid: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
            default: 0,
        },
        lat: {
            type: Number,
            required: true,
            default: 0,
        },
        address: {
            type: String,
            required: true,
        },
        available: {
            type: Boolean,
            required: true,
        },
        archive: {
            type: Boolean,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

/**
 * @description Export the message mongoose Schema.
 * @export
 * @Model message 
 */
export const message: mongoose.Model<IMessageModel> = mongoose.model<IMessageModel>('Message', messageSchema);
