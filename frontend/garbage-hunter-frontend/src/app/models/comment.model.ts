/** 
 * Model for Comment 
 */

export class Comment{
    _id?: string;
    text: string;
    creatorid: number;
    messageid: string;
    archive: boolean;
    created_at?: Date;
}