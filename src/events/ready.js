const { counterHandler, inviteHandler } = require("@src/handlers");
const { cacheReactionRoles } = require("@schemas/Message");
const { getSettings } = require("@schemas/Guild");
const { updateCounterChannels } = require("@src/handlers/counter");
const { PRESENCE } = require("@root/config");
const axios = require('axios');

/**
 * @param {import('@src/structures').BotClient} client
 */
module.exports = async (client) => {
  client.logger.success(`Logged in as ${client.user.tag}! (${client.user.id})`);

  client.logger.log("Initializing music manager");
  client.musicManager.init(client.user.id);

  if (PRESENCE.ENABLED) {
    updatePresence(client);
    setInterval(() => updatePresence(client), 10 * 60 * 1000);
  }

  if (client.config.INTERACTIONS.SLASH || client.config.INTERACTIONS.CONTEXT) {
    if (client.config.INTERACTIONS.GLOBAL) await client.registerInteractions();
    else await client.registerInteractions(client.config.INTERACTIONS.TEST_GUILD_ID);
  }

  await cacheReactionRoles(client);

  for (const guild of client.guilds.cache.values()) {
    const settings = await getSettings(guild);

    if (settings.counters.length > 0) {
      await counterHandler.init(guild, settings);
    }

    if (settings.invite.tracking) {
      inviteHandler.cacheGuildInvites(guild);
    }
  }

  setInterval(() => updateCounterChannels(client), 10 * 60 * 1000);

  const webhookUrl = process.env.STATUS_LOGS;
  if (webhookUrl) {
    try {
      await axios.post(webhookUrl, {
        embeds: [{
          title: "🟢 Bot online",
          description: `The bot **${client.user.tag}** is online and operational!`,
          color: 5763741, // Verde
          timestamp: new Date()
        }]
      });
      client.logger.log("Status webhook successfully sent.");
    } catch (error) {
      client.logger.error("Unable to send status webhook", error);
    }
  }
};

/**
 * @param {import('@src/structures').BotClient} client
 */
const updatePresence = (client) => {
  let message = PRESENCE.MESSAGE;

  if (message.includes("{servers}")) {
    message = message.replaceAll("{servers}", client.guilds.cache.size);
  }

  if (message.includes("{members}")) {
    const members = client.guilds.cache.map((g) => g.memberCount).reduce((partial_sum, a) => partial_sum + a, 0);
    message = message.replaceAll("{members}", members);
  }

  client.user.setPresence({
    status: PRESENCE.STATUS,
    activities: [
      {
        name: message,
        type: PRESENCE.TYPE,
      },
    ],
  });
};