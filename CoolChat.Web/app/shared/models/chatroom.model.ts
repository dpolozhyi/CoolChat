import { MessageModel } from './message.model';

export class ChatRoomModel {
    Id: number;
    Name: string;
    IsActive: boolean;
    CreatedTime: Date;
    Messages: MessageModel[];
}