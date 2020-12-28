const { Command } = require('discord.js-commando');
const fs = require('fs')
const { MessageEmbed, MessageAttachment, Message } = require("discord.js");


module.exports = class NintendoDs extends Command {
    constructor(client){
        super(client, {
            name: 'nintendods',
            memberName: 'nintendods',
            aliases: [ 'ndsi', 'hugenintendo', 'hugenintendodsi','hugeninds','hugeds','nds',],
            group: 'fun',
            description: 'Large Nintendo DS.'

        })
    } 
    async run(message){
        let attch = getImage();
        message.say({embed: getemb.bind(this)(attch), files:[attch[0]]})
    }
}
function getImage(){
    let imgs = fs.readdirSync(require('path').resolve(__dirname, 'nintendods'));
    let img = imgs[Math.floor(Math.random() * imgs.length)];
    return [
            {attachment: require('path').resolve(__dirname, 'nintendods', img), name: 'file001.' + img.split('.')[1]},
            'https://twitter.com/@HugeNintendoDS/status/' + img.split('/')[img.split('/').length-1].split('-')[0],
            'attachment://file001.' + img.split('.')[1]
        ]
    
    
}
function getemb(attch){
    return new MessageEmbed().setTitle('@HugeNintendoDS on Twitter').setURL(attch[1]).setColor('FF0055').setImage(attch[2]).setAuthor(this.client.user.tag)
}