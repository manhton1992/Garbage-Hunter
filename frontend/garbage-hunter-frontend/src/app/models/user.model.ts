/** 
 * Model for User 
 */
export class User{
    _id?: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    passwordHash: string;
    isAdmin: boolean;
    isConfirm: boolean;
    profileImageUrl: string;
    created_at: Date;
}