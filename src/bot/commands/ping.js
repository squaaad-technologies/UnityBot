const {MessageEmbed, } = require('discord.js')
module.exports = {
    name: "ping",
    execute: async function(message, args, client){
	var time = Date.now()
        var timeGateway = time - message.createdTimestamp;
        var emb = new MessageEmbed()
            .setAuthor('Jai L.')
            .setColor('#FF0000')
            .setTitle('Pinging...')
            .addField('Info', 'To get your request from Discord to the bot, it takes some time (Not too much, we hope!). The gateway time is estimated by taking the time you created the message (according to discord) away from the current UNIX timestamp. It then calculates the rest of the ping time by taking our message\'s timestamp and subtracting it from your message\'s timestamp')
            .addField('Gateway', `${timeGateway} ms`, true);
        var m = message.channel.send(emb).then(m => {
            var ping = m.createdTimestamp - time
            emb.setColor('#00FF00')
                .setTitle('Ping Successful!')
                .addField('Processing', `${ping} ms`, true)
		.addField('Total', `${ping+timeGateway} ms`, true);
            m.edit(emb)
        
        })


    }
}