import {Telegraf} from "telegraf";
import {IBotContext} from "../context/contenxt.interface";

export abstract class Command {
    constructor(public bot: Telegraf<IBotContext>) {}

    abstract handle(): void;
}
