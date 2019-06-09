/**
 * Model for User Category
 */

/** Package import */
import * as mongoose from 'mongoose';

/**
 * @description interface for UserCategory.
 * @export
 * @interface IUserCategoryModel
 * @extends {mongoose.Document}
 */
export interface IUserCategoryModel extends mongoose.Document {
    userId: string;
    categoryId: string;
}

/**
 * @description Schema of User Category for mongoose.
 * @export
 * @Schema UserCategorySchema 
 */
export const UserCategorySchema: mongoose.Schema = new mongoose.Schema(
    {
        userId: {
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
 * @Model userCategory
 */
export const userCategory: mongoose.Model<IUserCategoryModel> = mongoose.model<IUserCategoryModel>('UserCategory', UserCategorySchema);
