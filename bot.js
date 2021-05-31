const Discord = require('discord.js');
const discordBot = new Discord.Client();

discordBot.on('ready', () => console.log('Discord bot is connected.'));

discordBot.on('message', (message) => {
    console.log(message.author.username + ' ha dicho: \"' + message.content + '\"');
    //console.log(message.author.username + ' ha dicho: \"' + message.content + '\"');
});

//Discord bot connect!
discordBot.login('ODQ4OTA2MTE5ODk5OTA2MDQ4.YLTbbg.NWyKwoG9ueRdM412UdIMnMB22iM');