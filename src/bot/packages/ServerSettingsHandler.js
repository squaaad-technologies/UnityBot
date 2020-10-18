
class ServerSettings {
    constructor(settings, file) {
        this.file = file;
        this.settings=settings;
    }
    get(sid, setting){
        return this.settings[sid][setting] || false;
    }
    async set(sid, setting, value){
        this.settings[sid][setting] = value
        this.save()
    }
    joinedServer(sid){
        this.settings[sid] = this.default;
    }
    async save(){
        require('fs').writeFile(this.file, this.settings)
    }
    get default(){
        return {prefix: 'unt!', logs: false, log_channel_id: 0}
    }

}
module.exports = ServerSettings;