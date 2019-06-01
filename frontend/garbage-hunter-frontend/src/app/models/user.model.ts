/** 
 * Model for User 
 */
export class User{
    _id?: string;
    email: string;
    passwordHash: string;
    isAdmin: boolean;
    created_at: Date;
}