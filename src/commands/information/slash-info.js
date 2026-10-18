const { Command } = require("@src/structures");
const { CommandInteraction } = require("discord.js");
const user = require("./shared/user");
const channelInfo = require("./shared/channel");
const guildInfo = require("./shared/guild");
const avatar = require("./shared/avatar");
const emojiInfo = require("./shared/emoji");
const botInfo = require("./shared/botstats");

module.exports = class InfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "info",
      description: "show various information",
      category: "INFORMATION",
      botPermissions: ["EMBED_LINKS"],
      command: {
        enabled: false,
      },
      slashCommand: {
        enabled: true,
        options: [
          {
            name: "user",
            description: "get user information",
            type: "SUB_COMMAND",
            options: [
              {
                name: "name",
                description: "name of the user",
                type: "USER",
                required: false,
              },
            ],
          },
          {
            name: "channel",
            description: "get channel information",
            type: "SUB_COMMAND",
            options: [
              {
                name: "name",
                description: "name of the channel",
                type: "CHANNEL",
                required: false,
              },
            ],
          },
          {
            name: "guild",
            description: "get guild information",
            type: "SUB_COMMAND",
          },
          {
            name: "bot",
            description: "get bot information",
            type: "SUB_COMMAND",
          },
          {
            name: "avatar",
            description: "displays avatar information",
            type: "SUB_COMMAND",
            options: [
              {
                name: "name",
                description: "name of the user",
                type: "USER",
                required: false,
              },
            ],
          },
          {
            name: "emoji",
            description: "displays emoji information",
            type: "SUB_COMMAND",
            options: [
              {
                name: "name",
                description: "name of the emoji",
                type: "STRING",
                required: true,
              },
            ],
          },
        ],
      },
    });
  }

  /**
   * @param {CommandInteraction} interaction
   */
  async interactionRun(interaction) {
    const sub = interaction.options.getSubcommand();
    if (!sub) return interaction.followUp("Not a valid subcommand");
    let response;

    if (sub === "user") {
      let targetUser = interaction.options.getUser("name") || interaction.user;
      let target = await interaction.guild.members.fetch(targetUser);
      response = user(target);
    }

    else if (sub === "channel") {
      let targetChannel = interaction.options.getChannel("name") || interaction.channel;
      response = channelInfo(targetChannel);
    }

    else if (sub === "guild") {
      response = await guildInfo(interaction.guild);
    }

    else if (sub === "bot") {
      response = botInfo(interaction.client);
    }

    else if (sub === "avatar") {
      let target = interaction.options.getUser("name") || interaction.user;
      response = avatar(target);
    }

    else if (sub === "emoji") {
      let emoji = interaction.options.getString("name");
      response = emojiInfo(emoji);
    }

    else {
      response = "Incorrect subcommand";
    }

    await interaction.followUp(response);
  }
};
