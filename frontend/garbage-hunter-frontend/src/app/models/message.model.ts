/** 
 * Model for Message 
 */

export class Message{
    _id?: string;
    title: string;
    description: string;
    creatorId: string;
    lon: number;
    lat: number;
    address: string;
    available: boolean;
    archive: boolean;
    imageUrl: string;
    phone?: number;
    created_at?: Date;
    updated_at?: Date;
}
