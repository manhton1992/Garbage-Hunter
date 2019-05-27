/**
 * Model for User
 */

import * as mongoose from 'mongoose';

/**
 * @description interface for user.
 * @export
 * @interface IUserModel
 * @extends {mongoose.Document}
 */
export interface IUserModel extends mongoose.Document {
    username: string;
    token: string;
    password: string;
    created_at: Date;
}

/**
 * @description Schema of user for mongoose.
 * @export
 * @Schema userSchema 
 */
export const userSchema: mongoose.Schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
        },
    }
);

/**
 * @description Export the user mongoose Schema.
 * @export
 * @Model user 
 */
export const user: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);
