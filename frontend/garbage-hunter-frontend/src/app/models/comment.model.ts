/** 
 * Model for Comment 
 */

export class Comment{
    _id?: string;
    text: string;
    creatorId: string;
    parentId: string;
    messageId: string;
    imageUrl: string;
    archive: boolean;
    created_at?: Date;
}