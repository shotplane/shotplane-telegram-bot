import { configs } from "../configs"

import { Input, Telegraf, Context } from 'telegraf'
import { message } from 'telegraf/filters'
import { LogHelper } from "../core/logger"

import extra from 'telegraf/markup';

import path from "path"

class TelegramLoader {
    bot: Telegraf
    constructor() {
        this.bot = new Telegraf(configs.telegramBotKey,{
            telegram:{
                apiRoot: "https://api.telegram.org"
            }
        })
    }

    launch() {
        this.bot.launch()
    }

    async createMainContent(ctx: Context) {
        try {
            await ctx.sendPhoto("https://game.shotplane.org/images/game.webp", {
                caption: `<b>🌊🌊 Welcome to the Shot plane 🌊🌊</b> 

🚀 Let the adventure begin! 🚀`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Website', url: "https://www.shotplane.org/" },
                            { text: 'Join community', url: "https://www.x.com/shotplane" },
                            { text: 'Invite a friend', url: "https://t.me/share/url?url=https://t.me/shotplane_bot" },
                        ]
                    ],
                    keyboard: [
                        [
                            {
                                text: '🚀 Play game', web_app: {
                                    url: "https://game.shotplane.org/"
                                }
                            },
                            {
                                text: '/help'
                            },

                        ],
                    ],
                },
            });
        } catch (error) {

        }
    }

    async runMain() {
        try {
            LogHelper.log(`\n🚀 Telegram bot is running in ${configs.env} mode\n`);
            this.bot.start((ctx) => {
                // this.createMainContent(ctx);
            });
            this.bot.launch();
        } catch (error) {

        }

    }

}

export default TelegramLoader;

