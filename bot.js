require('dotenv').config();
const express = require('express');
const { Client, Intents } = require('discord.js');
const MessageEmbed = require('discord.js').MessageEmbed;
const GuildEmojiManager = require('discord.js').GuildEmojiManager;
const moment = require('moment');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});
const WELCOME_CHANNEL_NAME = 'welcome-test';
const BOT_USERNAME = 'magios-welcome';
let newJoinerRole;

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'react-custom') {
		const message = await interaction.reply('You can react with custom emojis!', { fetchReply: true });
		message.react('123456789012345678');
	}
});

client.once('ready', () => { 

    
    console.log('Discord bot is connected.') 
    
});

const temp = [];

client.on('message', async (message) => {

    if (!newJoinerRole) {
        await message.guild.roles.cache.find(role => {
            if (role.name == 'NewJoiner') {
                newJoinerRole = role;
            }
        });
    }

    if (message.author.username == BOT_USERNAME) {
        return;
    }

    message.channel.fetch().then(channel => { 

        //Clear all messages
        //message.messages.fetch().then(messages => { messages.forEach(msg => msg.delete()) });

        if (channel.name == WELCOME_CHANNEL_NAME) {

            if (message.author.username != 'sesh') {

                message.delete();

                console.log(message.content);
                switch(message.content) {
                    case '!start': 
                        channel.send("!poll [Jets ?] MIG-15bis, C-101, JF-17, M-2000C, F-14, AJS37, MB-339, AV-8B, MIG-21bis, MIG-19");
                        setTimeout(() => channel.send("Type !morejets to continue") , 1000);
                    break;
                    case '!morejets':
                        channel.send("!poll [Jets cont.?] A-10C, A-10CII, F/A-18C, F-16C, F-5E, F-86F, L-39, Flaming Cliffs");
                        setTimeout(() => channel.send("Type !terrains to continue or !end to finish") , 1000);
                        break;
                    case '!terrains':
                        channel.send("!poll [Terrains?] Persian Gulf, Syria, Channel, Normandy 1944, Nevada");
                        setTimeout(() => channel.send("Type !warbirds to continue or !end to finish") , 1000);
                        break;
                    case '!warbirds':
                        channel.send("!poll [Warbirds?] BF-109K, FW-190A, FW-190D, P-47, Spitfire MKIX, P-51, Mosquito, I-16");
                        setTimeout(() => channel.send("Type !helicopters to continue !end to finish") , 1000);
                        break;
                    case '!helicopters':
                        channel.send("!poll [Helicopters?] AH-64D, MI-24P, Ka-50, Mi-8MTV2, UH-1H, SA-342");
                        setTimeout(() => channel.send("Type !others to continue !end to finish") , 1000);
                        break;
                    case '!Others':
                        channel.send("!poll [Others?] CA, Supercarrier, NS-430, Christen Eagle II, YAK-52, WWII Asset Pack");
                        setTimeout(() => channel.send("Type !end to enter to Los Magios") , 1000);
                        break;
                    default: 
                        message.reply('El comando: <' + message.content + '> no es valido, para continuar debes ingresar: !continue')
                        .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                        })
                        .catch();
                        break;
                }

            } else {
                message.awaitReactions(true, { max: 1, time: 60000, errors: ['time'] }).then(data => console.log(data));
            }

        }
        
        
    })


});

const PORT = process.env.PORT || 3000;
const app = express();
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});



/*

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
                              //  outPutChannel.send(outPutMessage);
                            } else {
                                const steamNameRaw = splittedMessage[0].split(":")[1].trim();
                                const scumNameRaw = splittedMessage[1].split(":")[1].trim();
                                const steamIdRaw = splittedMessage[4].split(":")[1].trim();
                    
                                const outPutMessage = "```" + moment().format('DD/MM/yyyy') + ';' + steamNameRaw + ';' + scumNameRaw + ';' + steamIdRaw + "```";
                             //   outPutChannel.send(outPutMessage);
                            }
                        }
                    }
                } catch(error) {
                    console.log(error);
                }
            }
        });

*/