const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');


module.exports = class Blacklist extends Command {
    constructor(client){
        super(client, {
            name: 'blacklist',
            memberName: 'blacklist',
            group: 'bl',
            description: 'Perform a Blacklist Action on a user by ID',
            guildOnly: true,
            args: [
              {
                key: 'action',
                prompt:
                  'What action are you performing? (add, remove, approve, deny, amend)',
                type: 'string',
                validate: (action) => ['add', 'remove', 'approve', 'deny', 'amend', 'test'].includes(action.toLowerCase())
              },
              {
                  key: 'usr',
                  prompt:
                    'What is the User ID of the person you are trying to perform this action to?',
                  type: 'integer'
              },
              {
                  key: 'reason',
                  prompt: 
                  'What is the reason of this action or the amended reason? Please include links to screenshots, etc.',
                  type: 'string'
              }
            ],
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ['BAN_MEMBERS']
          })
    }
    async run(message, { action, usr, reason}){
        if ((!this.client.owners.includes(message.author)) && ['approve', 'deny', 'remove', 'test'].includes(action)){
            return message.say('<:youtried:794389149062791198>');
        };
        if (action == 'test'){
            message.say('---TEST LOADING---');
            usr = this.client.users.fetch(536292647996882954);
            action = 'add';
            reason = 'Test add, UID from Global Blacklists GDoc';
            message.say('---TEST PARAMS LOADED---');
        }
        switch(action){
            case 'add':
                let msg = new MessageEmbed()
                    .setTitle('Blacklist Form')
                    .setDescription('Form for posting blacklist changes')
                    .setFooter(message.author.name)
                    .addFields([
                        {name: "User ID of actioned user", value: `${usr.id}`, inline: true},
                        {name: "Action to be called on User", value: `Add user to global blacklist`, inline: true},
                        {name: "Reason to call action", value: `${usr.avatarURL()}`, inline: false},
                    ]);
                break;
            case 'remove':
                let msg = new MessageEmbed()
                    .setTitle('Blacklist Form')
                    .setDescription('Form for posting blacklist changes')
                    .setFooter(message.author.name)
                    .addFields([
                        {name: "User ID of actioned user", value: `${usr.id}`, inline: true},
                        {name: "Action to be called on User", value: `Remove user from global blacklist`, inline: true},
                        {name: "Reason to call action", value: `${usr.avatarURL()}`, inline: false},
                    ]);
                break;
            case 'add':
                let msg = new MessageEmbed()
                    .setTitle('Blacklist Form')
                    .setDescription('Form for posting blacklist changes')
                    .setFooter(message.author.name)
                    .addFields([
                        {name: "User ID of actioned user", value: `${usr.id}`, inline: true},
                        {name: "Action to be called on User", value: `Add user to global blacklist`, inline: true},
                        {name: "Reason to call action", value: `${usr.avatarURL()}`, inline: false},
                    ]);
                break;
            case 'add':
                let msg = new MessageEmbed()
                    .setTitle('Blacklist Form')
                    .setDescription('Form for posting blacklist changes')
                    .setFooter(message.author.name)
                    .addFields([
                        {name: "User ID of actioned user", value: `${usr.id}`, inline: true},
                        {name: "Action to be called on User", value: `Add user to global blacklist`, inline: true},
                        {name: "Reason to call action", value: `${usr.avatarURL()}`, inline: false},
                    ]);
                break;
        case 'add':
                let msg = new MessageEmbed()
                    .setTitle('Blacklist Form')
                    .setDescription('Form for posting blacklist changes')
                    .setFooter(message.author.name)
                    .addFields([
                        {name: "User ID of actioned user", value: `${usr.id}`, inline: true},
                        {name: "Action to be called on User", value: `Add user to global blacklist`, inline: true},
                        {name: "Reason to call action", value: `${usr.avatarURL()}`, inline: false},
                    ]);
                break;
            case 'add':
                let msg = new MessageEmbed()
                    .setTitle('Blacklist Form')
                    .setDescription('Form for posting blacklist changes')
                    .setFooter(message.author.name)
                    .addFields([
                        {name: "User ID of actioned user", value: `${usr.id}`, inline: true},
                        {name: "Action to be called on User", value: `Add user to global blacklist`, inline: true},
                        {name: "Reason to call action", value: `${usr.avatarURL()}`, inline: false},
                    ]);
                break;

        }
    }
}