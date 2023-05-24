import {IConfigService} from "./config/config.interface";
import {Telegraf} from "telegraf";
import {ConfigService} from "./config/config.service";
import {IBotContext} from "./context/contenxt.interface";
import {Command} from "./commands/commands.class";
import {StartCommand} from "./commands/start.command";
import LocalSession from "telegraf-session-local";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA_QelSohOzoQwU3LUUBJGfSJryfGE1r_A",
    authDomain: "stram-9c351.firebaseapp.com",
    projectId: "stram-9c351",
    storageBucket: "stram-9c351.appspot.com",
    messagingSenderId: "183204440880",
    appId: "1:183204440880:web:a727569ecbd73d385f76f5",
    measurementId: "G-7P8QCSFBCW",
    databaseURL: "https://stram-9c351-default-rtdb.europe-west1.firebasedatabase.app/"
};

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
            {command: '/start', description: 'Перезапуск'}
        ]

        await this.bot.telegram.setMyCommands(commands);
    }
}

const bot = new Bot(new ConfigService());
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

bot.init();
