const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class Kick extends Command{
    constructor(client){
        super(client, {
            name: "kick",
            memberName: "kick",
            group: "mod",
            aliases: ['yeet'],
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    key:"user",
                    type: "user",
                    prompt: "Who do you want to kick?"
                },
                {
                    key: "reason",
                    type: "string",
                    prompt:"Why do you want to kick them?"
                }
            ],
            description: "Kicks a member."
        });
    }
    async run(message, { user, reason }){
        if (!message.guild.available){ // ! dont-crash-bot.js
            return message.say(oneLine`This guild is having some issues on Discord\'s end right now, 
            and to avoid a bot-wide crash, this command can not be executed right now.`) // ! avoid mega fucky wucky
            
        }
        var isValid = await checkKickValidity(message, {user, reason})
        if (!isValid.is){
            return message.say(`You cannot kick ${user.username}. Reason: ${isValid.reason}`)
        }
        message.guild.members.fetch(user.id).then(usr => usr.kick(reason))
        var m = new MessageEmbed()
            .setTitle(`${message.author.username} kicked ${user.username} | Case ${message.guild.metadata.caseNum}`)
            .setColor('FFDD00')
            .addField('Reason:', reason)
        message.say(m)
        message.guild.metadata.caseNum++;
        let logsChannel = resolveLogsChannel(message);
        if (!!logsChannel){
            logsChannel.send(m)
        }
    }
}

function resolveLogsChannel(message){
    if (message.guild.metadata.logsChannel == 0){
        return false;
    } else {
        let channel = message.guild.channels.resolve(message.guild.metadata.logsChannel);
        if (channel.type != 'text'){
            return false;
        } else {
            return true;
        }
    }

}

async function checkKickValidity(message, {user, reason}){
    var guildMemberFromMessage = await message.guild.members.fetch(message.author.id), guildMemberToKick = await ( async () => {try {return await message.guild.members.fetch(user.id)} catch {return undefined}})() ;
    if (guildMemberToKick == undefined){
        return {
            is: false,
            reason: `User with ID ${user.id} is not on this server.`
        }
    } else if (guildMemberFromMessage.roles.highest.comparePositionTo(guildMemberToKick.roles.highest) <= 0){
        return {
            is: false,
            reason: `User with ID ${user.id} has a role that is higher then yours!`
        }
    } else if (!reason.toLowerCase().includes('rule')){
        return {
            is: false,
            reason: `The reason does not include 'rule', therefore it is not a valid reason.`
        }
    }
    else {
        return {
            is: true,
            reason: null
        }
    }
}