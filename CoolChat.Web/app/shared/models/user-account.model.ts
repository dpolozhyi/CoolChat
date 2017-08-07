import { BriefDialogModel } from "./brief-dialog.model"

export class UserAccountModel {

    constructor() { }

    id: number;
    name: string;
    avatarUrl: string;
    isOnline: boolean;
    lastTimeActivity: Date;
    dialogs: BriefDialogModel[];
}