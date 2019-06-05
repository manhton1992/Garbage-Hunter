/**
 * Model for Comment
 */

/** Package import */
import * as mongoose from 'mongoose';

/**
 * @description interface for comment.
 * @export
 * @interface ICommentModel
 * @extends {mongoose.Document}
 */
export interface ICommentModel extends mongoose.Document {
    text: string;
    creatorid: number;
    messageid: string;
    archive: boolean;
    created_at: Date;
}

/**
 * @description Schema of comment for mongoose.
 * @export
 * @Schema CommentSchema 
 */
export const CommentSchema: mongoose.Schema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        creatorid: {
            type: Number,
            required: true,
        },
        messageid: {
            type: String,
            required: true,
        },
        archive: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
        },
    }
);

/**
 * @description Export the comment mongoose Schema.
 * @export
 * @Model comment
 */
export const comment: mongoose.Model<ICommentModel> = mongoose.model<ICommentModel>('Comment', CommentSchema);
