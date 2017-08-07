import { UserModel } from "./user.model";
import { MessageModel } from "./message.model";

export class BriefDialogModel {
    constructor() { }

    id: number;

    name: string;

    newMessagesNumber: number;

    members: UserModel[];

    lastMessage: MessageModel;

    timeCreated: Date;
}