const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const sf = require('snekfetch')

module.exports = class BlushCommand extends Command {
    constructor(client) {
        super(client, {
          name: 'blush',
          memberName: 'blush',
          group: 'actions',
          description: 'Blush with an anime gif!',
          guildOnly: true,
        });
    }
    async run(message,){
        var img = await getImg();
        var emb = new MessageEmbed()
            .setImage(img)
            .setFooter('Made possible by tnai API', 'https://cdn.discordapp.com/attachments/702047402328195152/761426522057343006/20200930_213752.png')
        message.say(`<@!${message.member.id}> blushes`, {embed: emb})
    }
    
}
async function getImg(){
  var resp = await sf.get('https://tnai.ml/sfw/blush')
  return resp.body.url;
}