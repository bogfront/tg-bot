import {IConfigService} from "./config/config.interface";
import {Telegraf} from "telegraf";
import {ConfigService} from "./config/config.service";
import {IBotContext} from "./context/contenxt.interface";
import {Command} from "./commands/commands.class";
import {StartCommand} from "./commands/start.command";
import LocalSession from "telegraf-session-local";

class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor (private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use(
            new LocalSession({database: 'sessions.json'}).middleware()
        );
    }

    async init () {
        this.commands = [
            new StartCommand(this.bot)
        ]
        for (const command of this.commands) {
            command.handle();
        }

        await this.setBotCommands();
        await this.bot.launch();
    }

    async setBotCommands () {
        const commands = [
            {command: '/getme', description: 'Тестовые команды'}
        ]

        await this.bot.telegram.setMyCommands(commands);
    }
}

const bot = new Bot(new ConfigService());
bot.init();
