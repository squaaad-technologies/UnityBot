//uwu
const CommandsHandler = require('./packages/CommandsHandler.js');
const Discord = require('discord.js');
const ServerSettings = require('./packages/ServerSettingsHandler.js')

const Client = new Discord.Client();
Client.SettingsManager = new ServerSettings(require(require('path').join(__dirname, 'config.json')), require('path').join(__dirname, 'config.json'));

Client.login(process.env.botToken || Client.SettingsManager.get('client','token'));
Client.commands = new CommandsHandler(require('path').join(__dirname,'commands'));
Client.on('message', message => {
        if(message.author.bot){return;};
        var prefix = Client.SettingsManager.get(message.guild.id, 'prefix') || Client.SettingsManager.defaults.prefix;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if(Client.commands.has(command)){try{Client.commands.get(command).execute(message,args,Client,)} catch (err) {console.log(err); message.reply('There was an uncaught error executing that command! Tell the devs (<@!98133204636028928> because dont ping mods) for help!')}};
        });
Client.on('guildCreate', guild => {Client.SettingsManager.joinedServer(guild.id)});


