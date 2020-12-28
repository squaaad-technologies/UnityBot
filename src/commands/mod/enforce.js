const { Command } = require('discord.js-commando');

module.exports = class Enforce extends Command {
    constructor(client) {
        super(client, {
          name: 'enforce',
          memberName: 'enforce',
          group: 'mod',
          description: 'Make a warning to enforce a rule.',
          guildOnly: true,
          args:[
            {
                key: "user",
                prompt:
                  "Who are you enforcing this rule on?",
                type: "user",
              },
              {
                key: "rule",
                prompt:
                  "What rule are you enforcing?",
                type: "integer",
              },
              {
                key: "reason",
                prompt:
                  "Why are you enforcing this rule?",
                type: "string",
              }

          ],
          userPermissions: ['KICK_MEMBERS']
        });
    }
    async run(message, { user, rule, reason}){
        message.say(`<@!${user.id}>, You have broken rule ${String(rule)}. The moderator <@!${message.author.id}> has warned you with reason: ${reason}.`)
    }
    
}
