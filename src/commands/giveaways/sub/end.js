/**
 * @param {import('discord.js').GuildMember} member
 * @param {string} messageId
 */
module.exports = async (member, messageId) => {
  if (!messageId) return "You must provide a valid message id.";

  if (!member.permissions.has("MANAGE_MESSAGES")) {
    return "You need to have the manage messages permissions to start giveaways.";
  }

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return `Unable to find a giveaway for messageId: ${messageId}`;

  if (giveaway.ended) return "The giveaway has already ended.";

  try {
    await giveaway.end();
    return "Success! The giveaway has ended!";
  } catch (error) {
    member.client.logger.error("Giveaway End", error);
    return `An error occurred while ending the giveaway: ${error.message}`;
  }
};