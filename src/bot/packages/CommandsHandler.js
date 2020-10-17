const Discord = require('discord.js')
class CommandsHandler extends Discord.Collection{
    constructor(dir) {
        super(); // owo
        this._dir = dir;
        this.commands.forEach(command => this.assignCommand(command.name, command))
    }
    get commands(){
        return require('fs').readdirSync(this._dir).filter(file => file.endsWith('.js') && !file.includes('.disabled'));
    }
    assignCommand(name, command){
        this.set(name, command);
    }
}

