const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'prefix',
    type: {
        name: "Moderation",
        typeid: 3
    },
    description: 'Change the prefix of a server!',
    execute: function(message, args, client){
        if (!message.channel.guild.member(message.author).hasPermission('MANAGE_CHANNELS')){return message.reply('You dont have enough permissions to do that! (You need: Manage Channels)');}
        if(args.length == 0 || args === undefined) {
            var c = new MessageEmbed()
                .setTitle(`Prefix for ${message.channel.guild.name}`)
                .setFooter('- Jai L.')
                .addField('Prefix', `${client.SettingsManager.get(message.channel.guild.id, 'prefix')|| client.SettingsManager.defaults.prefix}`)
                .setColor('#00FF00');
            return message.channel.send(c);
        } else {
            if(args[0]=='reset'){
                client.SettingsManager.set(message.channel.guild.id, 'prefix', client.SettingsManager.defaults.prefix);
                var c = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`)
                    .setTitle(`Prefix for ${message.channel.guild.name} has been reset to ${client.SettingsManager.get(message.channel.guild.id, 'prefix')}`)
                    .setFooter('- Jai L.')
                    .addField('Prefix', `${client.SettingsManager.get(message.channel.guild.id, 'prefix')|| client.SettingsManager.defaults.prefix}`)
                    .setColor('#00FF00');
                return message.channel.send(c)
            }
            client.SettingsManager.set(message.channel.guild.id, 'prefix', args[0]);
            var c = new MessageEmbed()
                .setAuthor(`${message.author.tag}`)
                .setTitle(`Prefix for ${message.channel.guild.name} has been changed to ${args[0]}`)
                .setFooter('- Jai L.')
                .addField('Prefix', `${client.SettingsManager.get(message.channel.guild.id, 'prefix')|| client.SettingsManager.defaults.prefix}`)
                .setColor('#00FF00');
            return message.channel.send(c)
        }
    }
}