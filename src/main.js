const commando = require("discord.js-commando");
const sqlite = require("sqlite");
const {token, mongo, youtube} = getEnviron();
const path = require('path');
const oneLine = require('common-tags').oneLine;
const { Structures } = require('discord.js');
const { Worker } = require('worker_threads');
const fs = require('fs')
const { MongoClient } = require('mongodb');
var webserver;

Structures.extend('Guild', Guild => {
    class MusicGuild extends Guild {
      constructor(client, data) {
        super(client, data);
        this.VoiceManager = {
          isPlaying: false,
          queue: [],
          audioDispatch: null,
          VoiceConnection: null,
        }
        this.metadata = {
          caseNum: 1,
          logsChannel: 0,
          

        }
      }
    }
    return MusicGuild;
});

Structures.extend('GuildMember', GuildMember => {
  class BetterGuildUser extends GuildMember {
    constructor(c, d, g){
      super(c, d, g)
      this.c = c
    }
    from(user, g, c){
      if(typeof user !== 'User'){
        return null;
      } else {
        return new this(c,user,g)
      }
    }
  }
  return BetterGuildUser
})


if (token == null){
  throw new Error('ENVIRON VARIABLES ARE NOT DEFINED! EXITING.');
}


const client = new commando.Client({
  owner: '98133204636028928',
  commandPrefix: "sq!",
});
client.on("error", console.error)
  .on("warn", console.warn)
  .on("debug", console.log)
  .on("ready", () => {
    client.auth = {
      youtube,
      token,
      mongo
    };
    console.log(
      `Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id}) [MONGO STATUS: NOT READY]`
    );
    const mongo_cl = MongoClient(mongo, { useNewUrlParser: true });
    mongo.connect()
    .then(() => {client.mongoIsReady = true; console.log(`Client Ready; Mongo connected.`); client.MONGO = mongo_cl;})
    .catch(err => {console.error(err)});
    this.emit('AuthSet')
  })
  .on("disconnect", () => {
    console.warn("Disconnected!");
  })
  .on("reconnecting", () => {
    console.warn("Reconnecting...");
  })
  .on("commandError", (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on("commandBlocked", (msg, reason) => {
    console.log(oneLine`
        Command ${
          msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""
        }
        blocked; ${reason}
    `);
  })
  .on("commandPrefixChange", (guild, prefix) => {
    console.log(oneLine`
        Prefix ${
          prefix === "" ? "removed" : `changed to ${prefix || "the default"}`
        }
        ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
    `);
  })
  .on("commandStatusChange", (guild, command, enabled) => {
    console.log(oneLine`
        Command ${command.groupID}:${command.memberName}
        ${enabled ? "enabled" : "disabled"}
        ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
    `);
  })
  .on("groupStatusChange", (guild, group, enabled) => {
    console.log(oneLine`
        Group ${group.id}
        ${enabled ? "enabled" : "disabled"}
        ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
    `);
  })
  
  .on('WSStartCommand', () => {
    console.warn('WEBSERVER START COMMAND CALLED, STARTING WEBSERVER.');
    startWebServer();
  })
  .on('blacklistAdd', (uid, originServer) => {
    
  })
  


client.setProvider(
  sqlite
    .open(path.join(__dirname, "settings.sqlite3"))
    .then((db) => new commando.SQLiteProvider(db))
).catch(console.error);
client.registry
    .registerDefaults()
    .registerGroups([
        ['music', 'Music related commands'],
        ['actions', 'Actions'],
        ['mod','Moderation commands'],
        ['fun', 'Fun commands'],
        ['bl','Global Blacklist Commands']
    ])
    //.registerTypesIn(path.join(__dirname, 'types'))
    .registerCommandsIn(path.join(__dirname, 'commands'))
;

function startWebServer(){
  webserver = new Worker(path.join(__dirname, 'webserver.js'));
  regWS(webserver);
}

function regWS(ws){
  ws.on('exit', function(exitCode){
    fs.existsSync(path.join(__dirname, '/restart.key'))
      ? () => {
        startWebServer()
        fs.unlink(path.join(__dirname, '/restart.key'), ()=>{})
      }
      : () => {
        console.error('WEBSERVER HAS BEEN SHUT DOWN')
      }
  })
}

function getEnviron() {
  var { existsSync } = require('fs');
  var { join } = require('path')
  if (existsSync(join(__dirname, 'auth.json'))){
    var cfg = require(join(__dirname, 'auth.json'));
    if (cfg.hasOwnProperty('token') && cfg.hasOwnProperty('mongo') && cfg.hasOwnProperty('youtubeAPIkey') /*&& cfg.hasOwnProperty() && cfg.hasOwnProperty() && cfg.hasOwnProperty() */){
      return {
        token: cfg.token,
        mongo: cfg.mongo,
        youtube: cfg.youtubeAPIkey
      };
    };
  };
  var cfg = process.env;
  if (cfg.hasOwnProperty('token') && cfg.hasOwnProperty('mongo') && cfg.hasOwnProperty('youtubeAPIkey') /*&& cfg.hasOwnProperty() && cfg.hasOwnProperty() && cfg.hasOwnProperty() */){
    return {
      token: cfg.token,
      mongo: cfg.mongo,
      youtube: cfg.youtubeAPIkey
    };
  };
  return {
    token: null,
    mongo: null,
    youtube: null
  };
}

client.login(token)