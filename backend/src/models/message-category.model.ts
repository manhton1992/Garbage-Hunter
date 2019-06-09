/**
 * Model for Message Category
 */

/** Package import */
import * as mongoose from 'mongoose';

/**
 * @description interface for MessageCategory.
 * @export
 * @interface IMessageCategoryModel
 * @extends {mongoose.Document}
 */
export interface IMessageCategoryModel extends mongoose.Document {
    messageId: string;
    categoryId: string;
}

/**
 * @description Schema of Message Category for mongoose.
 * @export
 * @Schema MessageCategorySchema 
 */
export const MessageCategorySchema: mongoose.Schema = new mongoose.Schema(
    {
        messageId: {
            type: String,
            required: true,
        },
        categoryId: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

/**
 * @description Export the comment mongoose Schema.
 * @export
 * @Model messageCategory
 */
export const messageCategory: mongoose.Model<IMessageCategoryModel> = mongoose.model<IMessageCategoryModel>('MessageCategory', MessageCategorySchema);
