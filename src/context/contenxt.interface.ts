import { Context } from "telegraf";

export interface NewTool {
    name: string;
    article: string;
    objectId: string;
    photos: string[];
    movingDate: string;
    inventoryDate: string;
    purchaseDate: string;
    broken: boolean;
}

export interface NewObject {
    address: string;
    customer: string;
    supervisor: string;
    receiver: string;
}

export interface SessionData {
    currentStep: string;
    newTool: NewTool | {};
    newObject: NewObject | {};
}

export interface IBotContext extends Context {
    session: SessionData;
}
