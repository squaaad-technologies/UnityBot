const Discord = require('discord.js')
class CommandsHandler extends Discord.Collection{
    constructor(dir) {
        super(); // owo
        this._dir = dir;
        this.commands.forEach(command => this.assignCommand(require(command)));
    }
    get commands(){
        return this.getAllCommands(this._dir);
    }
    getAllCommands(dir){
        var commands = [];
        require('fs').readdirSync(dir).forEach(index => {
            if (require('fs').lstatSync(require('path').join(dir, index)).isDirectory()){this.getAllCommands(require('path').join(dir, index)).forEach(command => commands.push(command))}
            else if (index.endsWith('.js') && !index.includes('disabled')) {commands.push(require('path').join(dir, index))}
        })
        return commands;
    }
    assignCommand(command){
        this.set(command.name, command);
        console.log(`[HANDLER:COMMANDS] ${command.name} assigned.`)
    }
}
module.exports = CommandsHandler
