/** 
 * Model for Message 
 */

export class Message{
    _id?: string;
    title: string;
    description: string;
    creatorid: number;
    lon: number;
    lat: number;
    address: string;
    available: boolean;
    archive: boolean;
    image: string;
    phone?: number;
    created_at?: Date;
    updated_at?: Date;
}
