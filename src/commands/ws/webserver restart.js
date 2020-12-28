const fs = require('fs');
const { Command } = require('discord.js-commando')


module.exports = class WebserverRestartCommand extends Command {
	constructor(client) {
		super(client, {
            name: 'webserver restart',
            aliases: ['ws r', 'ws -r', 'webserver r', 'webserver -r'],
			group: 'ws',
			memberName: 'ws-restart',
			description: 'Restarts the WebServer.',
			details: 'Only the bot owner(s) may use this command.',
			ownerOnly: true,

		});

	}

	run(msg, args) {
    }
}