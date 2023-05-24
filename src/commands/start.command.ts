//@ts-nocheck
import {Command} from "./commands.class";
import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/contenxt.interface";
import {initUser} from "../database/users.database";
import {addObject, getObjects} from "../database/objects.database";
import {ADD_OBJECT, ADD_TOOL} from "../helpers/current-step";
import {addTool} from "../database/tools.database";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    async handle(): Promise<void> {
        this.bot.start((ctx) => {
            initUser(ctx.message.chat.id, ctx.message.chat.username, `${ctx.message.chat.last_name} ${ctx.message.chat.first_name}`);

            this.start(ctx);
        })

        this.bot.action('add_tool', (ctx) => {
            ctx.session.newTool = {};
            ctx.session.currentStep = 'add_tool:0';
            ctx.editMessageText(ADD_TOOL[0].message);
        })

        this.bot.action('add_object', (ctx) => {
            ctx.session.newObject = {};
            ctx.session.currentStep = 'add_object:0';
            ctx.editMessageText(ADD_OBJECT[0].message);
        })

        this.bot.action(RegExp('\W*(select)\W*'), (ctx) => {
            this.addTool(ctx);
        })

        this.bot.action('skip', (ctx) => {
            this.addTool(ctx);
        })

        this.bot.on('text', (ctx) => {
            if (ctx.session.currentStep.includes('add_object')) {
                this.addObject(ctx);
            } else if (ctx.session.currentStep.includes('add_tool')) {
                this.addTool(ctx);
            }
        })
    }

    start (ctx: any) {
        ctx.session.currentStep = '';

        ctx.reply('Хотите добавить объект или инструмент?', Markup.inlineKeyboard([
            Markup.button.callback('+ Инструмент', 'add_tool'),
            Markup.button.callback('+ Объект', 'add_object'),
        ]))
    }

    async addObject(ctx: any) {
        let index = +ctx.session.currentStep.split(':')[1];
        const currentStep = ADD_OBJECT[index];

        ctx.session.newObject[currentStep.field] = ctx.message.text;
        if (ADD_OBJECT[index + 1]) {
            ctx.session.currentStep = `add_object:${index + 1}`;
            ctx.reply(ADD_OBJECT[index + 1].message);
        } else {
            await addObject(ctx.session.newObject);
            ctx.session.newObject = {}
            ctx.session.currentStep = '';
            ctx.reply('Адрес успешно добавлен ✅');
            this.start(ctx);
        }
    }

    async addTool (ctx: any) {
        let index = +ctx.session.currentStep.split(':')[1];
        const currentStep = ADD_TOOL[index];

        if (currentStep.type === 'text') {
            ctx.session.newTool[currentStep.field] = ctx.message.text;
        } else if (currentStep.type === 'select-object' || currentStep.type === 'select') {
            ctx.session.newTool[currentStep.field] = ctx.update.callback_query.data.split(':')[1];
        } else if (currentStep.type === 'photo' && ctx.update.callback_query.data !== 'skip') {
            console.log('Добавляю фото')
        }

        if (ADD_TOOL[index + 1]) {
            const nextStep = ADD_TOOL[index + 1];
            ctx.session.currentStep = `add_tool:${index + 1}`;

            if (nextStep.type === 'select-object') {
                const objects = await getObjects();
                const arrayObjects = Object.keys(objects).map(key => ({
                    ...objects[key],
                    id: key
                }))
                const addresses = arrayObjects.map((i: any, index: number) => `${index + 1}. ${i.address}`);
                const message = `Выберите один из следующих адресов:\n${addresses.join('\n')}`;
                const buttons = arrayObjects.map((i: any, index: number) =>
                    Markup.button.callback(`${index + 1}`, `select:${i.id}`)
                );
                ctx.reply(message, Markup.inlineKeyboard(buttons));
            } else if (nextStep.type === 'photo') {
                ctx.reply(nextStep.message, Markup.inlineKeyboard([
                    Markup.button.callback('Пропустить', 'skip')
                ]));
            } else if (nextStep.type === 'select') {
                const buttons = nextStep.buttons.map(i => Markup.button.callback(i.text, `select:${i.value}`));
                ctx.reply(ADD_TOOL[index + 1].message, Markup.inlineKeyboard(buttons));
            } else if (nextStep.type === 'text') {
                ctx.reply(ADD_TOOL[index + 1].message);
            }
        } else {
            await addTool(ctx.session.newTool);
            ctx.session.newTool = {}
            ctx.session.currentStep = '';
            ctx.reply('Инструмент успешно добавлен ✅');
            this.start(ctx);
        }
    }
}
