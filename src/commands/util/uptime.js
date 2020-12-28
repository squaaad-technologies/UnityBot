const { MessageEmbed } = require("discord.js");
const { Command } = require("discord.js-commando");

module.exports = class Uptime extends (
  Command
) {
    constructor(client) {
        super(client, {
          name: 'uptime',
          memberName: 'uptime',
          group: 'util',
          description: 'Show uptime of bot',
          guildOnly: true,
          userPermissions: ['SEND_MESSAGES']
        });
    }
  async run(message) {
    let seconds = Math.floor(message.client.uptime / 1000), minutes = Math.floor(seconds / 60), hours = Math.floor(minutes / 60), days = Math.floor(hours / 24);

    seconds %= 60, minutes %= 60, hours %= 24;

    return message
      .say(
          new MessageEmbed({
              
          })
        `Uptime: ${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds`
      )
      .catch(console.error);
  }
};
