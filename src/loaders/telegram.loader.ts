import { configs } from "../configs"
import TelegramBot from 'node-telegram-bot-api';

import { LogHelper } from "../core/logger"


class TelegramLoader {
    bot: TelegramBot
    constructor() {
        this.bot = new TelegramBot(configs.telegramBotKey, { polling: true })
    }


    async runMain() {
        try {
            LogHelper.log(`\n🚀 Telegram bot is running in ${configs.env} mode\n`);
            this.bot.onText(/\/start/, (msg) => {
                const chatId = msg.chat.id;
                this.bot.sendPhoto(chatId, "https://game.shotplane.org/images/game.webp", {
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
            });
        } catch (error) {

        }

    }

}

export default TelegramLoader;