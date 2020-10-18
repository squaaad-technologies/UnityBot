const Discord = require('discord.js')
class CommandsHandler extends Discord.Collection{
    constructor(dir) {
        super(); // owo
        this._dir = dir;
        this.commands.forEach(command => this.assignCommand(require(String(require('path').join(this._dir,command))).name, require(String(require('path').join(this._dir,command)))));
    }
    get commands(){
        return require('fs').readdirSync(this._dir).filter(file => file.endsWith('.js') && !file.includes('.disabled'));
    }
    assignCommand(name, command){
        console.log(`${name || "name undefined"}, ${command || "command undefined"}`)
        this.set(name, command);
    }
}
module.exports = CommandsHandler
