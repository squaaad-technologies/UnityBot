const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const oneLine = require("common-tags").oneLine;
const Pronouns = Object.freeze({
  unspecified:
    " has not set up %s's pronouns on pronoundb yet! %s can do that here: https://pronoundb.org",
  avoid: " is not ok with any pronouns! use %s's name!",
  any: " is ok with any pronouns!",
  hh: "'s pronouns are he/him",
  hs: "'s pronouns are he/she",
  ht: "'s pronouns are he/they",
  shh: "'s pronouns are she/he",
  sh: "'s pronouns are she/her",
  st: "'s pronouns are she/they",
  th: "'s pronouns are they/he",
  ts: "'s pronouns are they/she",
  tt: "'s pronouns are they/them",
});
const Unregistered =
  " has not set up %s's pronoundb account yet! %s can do that here: https://pronoundb.org";
module.exports = class PronounsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "pronouns",
      aliases: ["pr", "pronoun", "pronoundb"],
      memberName: "pronouns",
      group: "util",
      description: "Gets the pronouns of a user!",
      guildOnly: true,
      args: [
        {
          key: "user",
          prompt: "Who do you want to find the pronouns of?",
          type: "user",
        },
      ],
    });
  }
  async run(message, { user }) {
    const res = await fetch(
      `https://pronoundb.org/api/v1/lookup?platform=discord&id=${user.id}`,
    )
      console.log(
        `[util:pronouns] fetch request being handled for user ${user.id}\n[util:pronouns] DATA: resp status_code = ${res.status}\n[util:pronouns] DATA: Responce Body: ${JSON.stringify(res.body)}`
      );
      res.ok
        ? () => {
            message.say(
              `${user.username}${Pronouns[res.json().pronouns].replace(
                /\%s/gm,
                user.username
              )}`
            );
          }
        : () => {
            message.say(Unregistered.replace(/\%s/gm, user.username));
          };
    
  }
};
