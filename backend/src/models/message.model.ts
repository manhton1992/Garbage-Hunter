/**
 * Model for Message
 */

/** Package import */
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
	creatorId: string;
	lon: number;
	lat: number;
	address: string;
	available: boolean;
	archive: boolean;
	imageUrl: string;
	phone?: number;
	created_at: Date;
	updated_at: Date;
}

/**
 * @description Schema of message for mongoose.
 * @export
 * @Schema MessageSchema
 */
export const MessageSchema: mongoose.Schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		creatorId: {
			type: String,
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
			default: true,
		},
		archive: {
			type: Boolean,
			required: true,
			default: false,
		},
		imageUrl: {
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
 * @Model messageSchema
 */
export const message: mongoose.Model<IMessageModel> = mongoose.model<IMessageModel>('Message', MessageSchema);
