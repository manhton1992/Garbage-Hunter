/**
 * Model for User
 */

/** Package imports */
import * as mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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
 * @Schema UserSchema 
 */
export const UserSchema: mongoose.Schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
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
            updatedAt: 'updated_at',
        },
    }
);

UserSchema.plugin(uniqueValidator);     // prevent identical username

/**
 * @description Export the user mongoose Schema.
 * @export
 * @Model user 
 */
export const user: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);
