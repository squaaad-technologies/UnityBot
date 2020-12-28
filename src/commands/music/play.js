const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const Youtube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const { youtubeAPIKey } = require("../../auth.json");
const youtube = new Youtube(youtubeAPIKey);

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
  }
  async run(message, { query }) {
    var voiceChannel = message.member.voice.channel;
    if (!!!voiceChannel) {
      return message.say("Enter a Voice Chat before running this command!");
    }
    if (
      query.match(
        /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/
      )
    ) {
      try {
        const playlist = await youtube.getPlaylist(query); 
        const videosObj = await playlist.getVideos(); 
        //const videos = Object.entries(videosObj); 
        
        for (let i = 0; i < videosObj.length; i++) {
          const video = await videosObj[i].fetch();

          const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
          const title = video.raw.snippet.title;
          let duration = this.getDurationStr(video.duration);
          const thumbnail = video.thumbnails.high.url;
          if (duration == "00:00") duration = "Live Stream";
          const song = {
            url,
            title,
            duration,
            thumbnail,
            voiceChannel,
          };

          message.guild.musicData.queue.push(song); 
        }
        if (message.guild.musicData.isPlaying == false) {
          
          message.guild.musicData.isPlaying = true;
          return this.playVideo(message.guild.musicData.queue, message); 
        } else if (message.guild.musicData.isPlaying == true) {
          
          return message.say(
            `Playlist - :musical_note:  ${playlist.title} :musical_note: has been added to queue`
          );
        }
      } catch (err) {
        console.error(err);
        return message.say("Playlist is either private or it does not exist");
      }
    }
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      const url = query; 
      try {
        query = query
          .replace(/(>|<)/gi, "")
          .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = query[2].split(/[^0-9a-z_\-]/i)[0];
        const video = await youtube.getVideoByID(id);
        const title = video.title;
        let duration = this.getDurationStr(video.duration);
        const thumbnail = video.thumbnails.high.url;
        if (duration == "00:00") duration = "Live Stream";
        const song = {
          url,
          title,
          duration,
          thumbnail,
          voiceChannel,
        };
        message.guild.musicData.queue.push(song);
        if (
          message.guild.musicData.isPlaying == false ||
          typeof message.guild.musicData.isPlaying == "undefined"
        ) {
          message.guild.musicData.isPlaying = true;
          return this.playVideo(message.guild.musicData.queue, message);
        } else if (message.guild.musicData.isPlaying == true) {
          return message.say(`${song.title} added to queue`);
        }
      } catch (err) {
        console.error(err);
        return message.say("Something went wrong, please try again later");
      }
    }
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      const url = query; 
      try {
        query = query
          .replace(/(>|<)/gi, "")
          .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = query[2].split(/[^0-9a-z_\-]/i)[0];
        const video = await youtube.getVideoByID(id);
        const title = video.title;
        let duration = this.getDurationStr(video.duration);
        const thumbnail = video.thumbnails.high.url;
        if (duration == "00:00") duration = "Live Stream";
        const song = {
          url,
          title,
          duration,
          thumbnail,
          voiceChannel,
        };
        message.guild.musicData.queue.push(song);
        if (
          message.guild.musicData.isPlaying == false ||
          typeof message.guild.musicData.isPlaying == "undefined"
        ) {
          message.guild.musicData.isPlaying = true;
          return this.playVideo(message.guild.musicData.queue, message);
        } else if (message.guild.musicData.isPlaying == true) {
          return message.say(`${song.title} added to queue`);
        }
      } catch (err) {
        console.error(err);
        return message.say("Something went wrong, please try again later");
      }
    }
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      const url = query; 
      try {
        query = query
          .replace(/(>|<)/gi, "")
          .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = query[2].split(/[^0-9a-z_\-]/i)[0];
        const video = await youtube.getVideoByID(id);
        const title = video.title;
        let duration = this.getDurationStr(video.duration);
        const thumbnail = video.thumbnails.high.url;
        duration == "00:00"
            ? duration = "Live Stream"
            : duration = duration;
        const song = {url,title,duration,thumbnail,voiceChannel};
        message.guild.musicData.queue.push(song);
        if (!!!message.guild.musicData.isPlaying) {
          message.guild.musicData.isPlaying = true;
          return this.playVideo(message.guild.musicData.queue, message);
        } else if (message.guild.musicData.isPlaying == true) {
          return message.say(`${song.title} added to queue`);
        }
      } catch (err) {
        console.error(err);
        return message.say("Something went wrong, please try again later");
      }
    }
  }
  playVideo(queue, message) {
    var voiceChannel;
    queue[0].voiceChannel
      .join() 
      .then((connection) => {
        connection
          .play(
            ytdl(queue[0].url, {
              quality: "highestaudio",
              highWaterMark: 1024 * 1024 * 10,
            })
          )
          .on("start", () => {
            
            message.guild.musicData.songDispatcher = connection;
            //connection.setVolume(message.guild.musicData.volume);
            voiceChannel = queue[0].voiceChannel;
            
            const emb = new MessageEmbed()
              .setThumbnail(queue[0].thumbnail) 
              .setColor("#09a931")
              .addField("Now Playing:", queue[0].title)
              .addField("Duration:", queue[0].duration);
            
            if (queue.length != 1) emb.addField("Next Song:", queue[1].title);
            message.say(emb); 
            return queue.shift(); 
          })
          .on("finish", () => {
            
            if (queue.length >= 1) {
              
              return this.playVideo(queue, message); 
            } else {
              
              message.guild.musicData.isPlaying = false;
              return voiceChannel.leave();  
            }
          })
          .on("error", (e) => {
            message.say(`Fatal Error ${e.name} occured while trying to play music. Leaving...`);
            message.guild.musicData.queue.length = 0;
            message.guild.musicData.isPlaying = false;
            message.guild.musicData.nowPlaying = null;
            console.error(e);
            return voiceChannel.leave();
          });
      })
      .catch((e) => {
        console.error(e);
        return voiceChannel.leave();
      });
  }
  getDurationStr(durationObj) {
    const duration = `${durationObj.hours ? durationObj.hours + ":" : ""}${durationObj.minutes ? durationObj.minutes : "00"}:${durationObj.seconds < 10? "0" + durationObj.seconds: durationObj.seconds? durationObj.seconds: "00"}`;
    return duration;
  }
};
