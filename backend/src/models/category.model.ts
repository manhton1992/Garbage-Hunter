/**
 * Model for Category
 */

/** Package import */
import * as mongoose from 'mongoose';

/**
 * @description interface for category.
 * @export
 * @interface ICategoryModel
 * @extends {mongoose.Document}
 */
export interface ICategoryModel extends mongoose.Document {
	name: string;
}

/**
 * @description Schema of category for mongoose.
 * @export
 * @Schema CategorySchema
 */
export const CategorySchema: mongoose.Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

/**
 * @description Export the category mongoose Schema.
 * @export
 * @Model category
 */
export const category: mongoose.Model<ICategoryModel> = mongoose.model<ICategoryModel>('Category', CategorySchema);
