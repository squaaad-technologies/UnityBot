const { Command } = require("discord.js-commando");
const { MessageEmbed, GuildMember } = require("discord.js");
const Youtube = require("simple-youtube-api");
const ytdl = require("ytdl-core-discord");
const matchers = {
  LIST: /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/,
  VIDEO: /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/,
  EMBED: /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/
}
module.exports = class PlayCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "play",
      memberName: "play",
      group: "music",
      description: "Plays music from given URL or search!",
      guildOnly: true,
      clientPermissions: ["SPEAK", "CONNECT"],
      args: [
        {
          key: "query",
          prompt:
            "What song do you want to listen to? (Please enter YouTube Video URL, Playlist link, or Search Query)",
          type: "string",
          validate: (query) => query.length < 200 && query.length > 0,
        },
      ],
    });
    this.client.on('AuthSet', async ()=>{this.youtubeClient = new Youtube(this.client.auth.youtube)});
    
  }
  async run(message, { query }) {
    
    
    message.channel.startTyping();
    // * Check if youtubeClient is ready
    if(!this.youtubeClient){
      return message.say('The bot is still loading this module. Please try again later.')
    }
    // * Check if bot is currently connected to a chat in the guild
    if (message.guild.VoiceManager.isPlaying){
      message.channel.stopTyping();
      return message.say(':x: Already playing!')
    } 
    // * Check if user is currently connected to a voice chat in the guild
    if(!GuildMember.from(message.author.voiceChannel, message.guild.id, this.client).voice.channel){
      message.channel.stopTyping();
      return message.say(':x: You need to be in a Voice Channel to run this command');
    }
    // * if the video is an embed link or a video link
    if (query.match(matchers.EMBED) || query.match(matchers.VIDEO)){
      let videoID = query.split('/')[query.split('/').length-1].split('v=')[0].split('&')[0];
      var videoData;
      this.youtubeClient.getVideoByID(videoID)
        .then(video => {if(!video){message.channel.stopTyping();return message.say(`:x: Video with ID ${videoID} does not exist.`)}
                        else{videoData = {videoID: videoID, videoName: video.name, videoDuration: video.duration}};
                        return this.processVideo(videoData, message);
                        })
    }
  }
  processVideo({videoID, videoName, videoDuration}, message){
    var em = new MessageEmbed()
      .setTitle(`Loading ${videoName}...`)
      .setDescription('The bot is processing your request and will begin playing your video shortly.')
      .setColor('#c300c3')
    var msg = message.say(em);
    if (!videoDuration){
      em
      .setColor("#ff0000")
      .setTitle(`Loading ${videoName} failed.`)
      .setDescription('The video doesn\'t have any length data (this means that it\'s live)')
    message.channel.stopTyping();
    return msg.edit(em);
    }
    if (videoDuration.hours !== undefined && !(videoDuration.hours < 2)){
      em
        .setColor("#ff0000")
        .setTitle(`Loading ${videoName} failed.`)
        .setDescription('The video is over 2 hours long. You cannot play this video.')
      message.channel.stopTyping();
      return msg.edit(em);
    }
    var vman = GuildMember.from(message.author, message.guild.id, this.client).voice;
    if (!vman.channel){
      em
      .setColor('#dd0000')
      .setTitle('😠')
      .setDescription('Stop intentionally trying to crash the bot')
      message.channel.stopTyping();
      return msg.edit(em);
    }
    if (message.guild.VoiceManager.isPlaying){
      message.guild.VoiceManager.queue.push({videoName, videoID, videoDuration})
      em
      .setColor("#00aa00")
      .setTitle(`${videoName} added to the queue!`)
      .setDescription(`Your video is number ${message.guild.VoiceManager.queue.length} in the queue.`)
      message.channel.stopTyping();
      return msg.edit(em);
    }
    try{
      this.playVideo()
    } catch {
      em
      .setColor('#dd0000')
      .setTitle(':(')
      .setDescription('An Unknown Error Occured during the Voice Dispatch Process (attempting to connect and play to the voice channel)')
      message.channel.stopTyping();
      return msg.edit(em);
    }


  }
  playVideo({videoID, videoDuration, videoName, guildID}, vman, message){

    vman.channel.join()
        .then(connection => {
          message.guild.VoiceManager.isPlaying = true;
          message.guild.VoiceManager.VoiceConnection = connection;
          connection.play(await ytdl(`https://youtu.be/${videoID}`), { type: 'opus' })


        })
  }
  getDurationStr(durationObj) {
    const duration = `${durationObj.hours ? durationObj.hours + ":" : ""}${durationObj.minutes ? durationObj.minutes : "00"}:${durationObj.seconds < 10? "0" + durationObj.seconds: durationObj.seconds? durationObj.seconds: "00"}`;
    return duration;
  }
};
