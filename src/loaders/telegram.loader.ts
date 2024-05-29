import { configs } from "../configs"
import TelegramBot from 'node-telegram-bot-api';
import { LogHelper } from "../core/logger"


class TelegramLoader {
    bot: TelegramBot
    constructor() {
        this.bot = new TelegramBot(configs.telegramBotKey, {
            baseApiUrl: configs.telegramApiRoot,
            polling: true
        })
    }


    async runMain() {
        try {
            LogHelper.log(`\n🚀 Telegram bot is running in ${configs.env} mode\n`);
            this.bot.onText(/\/start/, (msg) => {
                const chatId = msg.chat.id;
                this.bot.sendPhoto(chatId, "https://game.shotplane.org/images/banner.webp", {
                    caption: `<b>🌊 Welcome to the Shot plane 🌊</b> 
                    
🚀 Let the adventure begin! 🚀`,
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: '🎮 Play game', web_app: {
                                        url: "https://game.shotplane.org"
                                    }
                                },
                            ],
                            [
                                { text: '🌐 Website', url: "https://www.shotplane.org/" },
                                { text: 'Join community', url: "https://t.me/shotplane" },
                            ], [
                                { text: '𝕏', url: "https://x.com/Shotplaneorg" },
                                { text: '👬 Invite a friend', url: "https://t.me/share/url?url=https://t.me/shotplane_bot" },
                            ]
                        ]
                    },
                });
            });
            this.bot.on("polling_error", (msg) => console.log(msg.message));
        } catch (error) {

        }

    }

}

export default TelegramLoader;