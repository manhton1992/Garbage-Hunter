/** 
 * Model for User 
 */
export class User{
    _id?: string;
    email: string;
    password: string;
    isAdmin: boolean;
    created_at: Date;
}