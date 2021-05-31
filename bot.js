require('dotenv').config();
const Discord = require('discord.js');
const moment = require('moment');

const discordBot = new Discord.Client();
const INPUT_CHANNEL_NAME = 'admin-new-players';
const OUTPUT_CHANNEL_NAME = 'admin-new-players-csv';
const AUTHOR_NAME = 'TEC1 Bot'; //'TEC1 Bot';

let outPutChannel = null;

//Discord bot connect!
discordBot.login(process.env.DISCORD_BOT_TOKEN);

discordBot.on('ready', () => {
    console.log('Discord bot is connected.')
    outPutChannel = discordBot.channels.cache.find(channel => channel.name === OUTPUT_CHANNEL_NAME );
});

discordBot.on('message', (message) => {
    //if (message.author.username != AUTHOR_NAME) return;
    message.channel.fetch().then(channel => { 
        if (channel.name == INPUT_CHANNEL_NAME) {
            try {
                if (message.content) {
                    const splittedMessage = message.content.split("\n");
                    if (splittedMessage.length > 0) {
                        if (splittedMessage.length == 11) {
                            const steamNameRaw = splittedMessage[1].split(":")[1].trim();
                            const scumNameRaw = splittedMessage[2].split(":")[1].trim();
                            const steamIdRaw = splittedMessage[5].split(":")[1].trim();
                
                            const outPutMessage = "```" + moment().format('DD/MM/yyyy') + ';' + steamNameRaw + ';' + scumNameRaw + ';' + steamIdRaw + "```";
                            outPutChannel.send(outPutMessage);
                        } else {
                            const steamNameRaw = splittedMessage[0].split(":")[1].trim();
                            const scumNameRaw = splittedMessage[1].split(":")[1].trim();
                            const steamIdRaw = splittedMessage[4].split(":")[1].trim();
                
                            const outPutMessage = "```" + moment().format('DD/MM/yyyy') + ';' + steamNameRaw + ';' + scumNameRaw + ';' + steamIdRaw + "```";
                            outPutChannel.send(outPutMessage);
                        }
                    }
                }
            } catch(error) {
                console.log(error);
            }
        }
    });
});
