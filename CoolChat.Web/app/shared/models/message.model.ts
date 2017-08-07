import { UserModel } from "./user.model";

export class MessageModel {
    constructor() { }

    id: number;
    body: string;
    dialogId: number;
    isReaded: boolean;
    user: UserModel;
    postedTime: Date;
}