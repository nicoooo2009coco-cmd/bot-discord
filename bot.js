require("dotenv").config();
require("module-alias/register");

const path = require("path");
const { startupCheck } = require("@utils/botUtils");
const { BotClient } = require("@src/structures");

global.__appRoot = path.resolve(__dirname);

const client = new BotClient();
client.loadCommands("src/commands");
client.loadContexts("src/contexts");
client.loadEvents("src/events");

process.on("unhandledRejection", (err) => client.logger.error(`Unhandled exception`, err));

(async () => {
  await startupCheck();
  if (client.config.DASHBOARD.enabled) {
    client.logger.log("Launching dashboard");
    try {
      const { launch } = require("@root/dashboard/app");
      await launch(client);
    } catch (ex) {
      client.logger.error("Failed to launch dashboard", ex);
    }
  }
  await client.initializeMongoose();
  await client.login(process.env.BOT_TOKEN);
})();
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.logger.log(`Logged in as ${client.user.tag}!`);

    const webhookUrl = process.env.STATUS_LOGS;
    if (webhookUrl) {
      try {
        await axios.post(webhookUrl, {
          embeds: [{
            title: "🟢 Bot Online",
            description: `The bot **${client.user.tag}** is online and operational!`,
            color: 5763741,
            timestamp: new Date()
          }]
        });
      } catch (error) {
        client.logger.error("Unable to send status webhook", error);
      }
    }
  },
};