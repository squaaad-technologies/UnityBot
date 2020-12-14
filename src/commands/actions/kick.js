const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const sf = require('snekfetch')

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
          name: 'kick',
          memberName: 'kick',
          group: 'actions',
          description: 'Kicks a user!',
          guildOnly: true,
          args: [
            {
              key: 'to',
              prompt:
                'Who do you want to kick?',
              type: 'user',
            },
          ],
        });
    }
    async run(message, { to }){
        var img = await getImg();
        var emb = new MessageEmbed()
            .setImage(img)
            .setFooter('Made possible by tnai API', 'https://cdn.discordapp.com/attachments/702047402328195152/761426522057343006/20200930_213752.png')
        message.say(`<@!${message.member.id}> kicks <@!${to.id}>`, {embed: emb})
    }
    
}
async function getImg(){
  var resp = await sf.get('https://tnai.ml/sfw/kick')
  return resp.body.url;
}